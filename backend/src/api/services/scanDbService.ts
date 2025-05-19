import { Json } from "sequelize/types/utils";
import { Scan } from "../../db/models/Scan";
import fs from "fs/promises";
import { parseStringPromise } from "xml2js";
import { Host } from "../../db/models/Host";
import { Port } from "../../db/models/Port";

async function parseJson(filePath: string): Promise<any> {
  const file = await fs.readFile(filePath, "utf-8");
  var jsonData: any = null;
  jsonData = await parseStringPromise(file);
  console.log(JSON.stringify(jsonData));
  return jsonData;
}

export async function parseAndSaveScan(filePath: string): Promise<null | any> {
  try {
    let jsonData = await parseJson(filePath);

    // create a Scan entry for the database

    const runstats = jsonData.nmaprun?.runstats[0];
    if (!runstats) throw new Error("Missing runstats\n");
    const runHosts = runstats.hosts[0].$;
    const fin = runstats.finished[0].$;
    const scan = await Scan.create({
      scan_results: jsonData,
      duration: parseFloat(fin.elapsed),
      host_count: parseInt(runHosts.total, 10),
      host_down: parseInt(runHosts.down, 10),
      host_up: parseInt(runHosts.up, 10),
      exit_success: fin.exit,
      summary: fin.summary,
    });
    const hosts = jsonData.nmaprun?.host ?? [];

    //  For each host in scan create a host entry in the database

    for (const host of hosts) {
      const newHost = await Host.create({
        scanId: scan.id,
        status: host.status[0].$.state,
        reason: host.status[0].$.reason,
        reason_ttl: parseInt(host.status[0].$.reason_ttl, 10),
        addr: host.address[0].$.addr,
        addr_type: host.address[0].$.addrtype,
        mac_addr: host.address[1]?.$.addr,
        vendor: host.address[1]?.$.vendor,
      });

      const extraPorts = host.ports?.[0]?.extraports ?? [];

      // logic for extraports loop. Here we handle the "extraports" property of the xml2js data
      // extraports typically represents the closed ports
      const extraData = extraPorts[0]?.extrareasons[0]?.$;
      let expandedExtras = extraData ? expandPortList(extraData.ports) : [];
      let extraReason = extraData?.reason;
      let extraProto = extraData?.proto;
      let extraState = extraPorts[0]?.$.state;

      for (const port of expandedExtras) {
        const newPort = await Port.create({
          portNumber: port,
          host_id: newHost.id,
          protocol: extraProto,
          state: extraState,
          reason: extraReason,
          reason_ttl: 0,
        });
      }
      // for each port in each host create a port entry in the database
      const ports = host.ports?.[0]?.port ?? [];
      for (const port of ports) {
        const st = port.state[0].$;
        const serv = port.service?.[0]?.$;
        const cpe = port.service?.[0]?.cpe ?? [];
        const newPort = await Port.create({
          portNumber: parseInt(port.$.portid, 10),
          host_id: newHost.id,
          protocol: port.$.protocol,
          state: st.state,
          reason: st?.reason,
          reason_ttl: parseInt(st?.reason_ttl, 10),
          service_name: serv?.name,
          service_product: serv?.product ?? null,
          service_method: serv?.method ?? null,
          service_version: serv?.version ?? null,
          cpe: cpe[0] ?? null,
        });
      }
    }

    return jsonData;
  } catch (err) {
    console.error("There was an error parsing and saving the scan", err);
    return null;
  }
}

function expandPortList(list: string): number[] {
  return list.split(",").flatMap((seg) => {
    if (seg.includes("-")) {
      const [start, end] = seg.split("-").map(Number);
      return Array.from({ length: end - start + 1 }, (_, i) => start + i);
    }
    return [Number(seg)];
  });
}
