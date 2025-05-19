import { Json } from "sequelize/types/utils";
import { Scan } from "../../db/models/Scan";
import fs from "fs/promises";
import { parseStringPromise } from "xml2js";
import { Host } from "../../db/models/Host";
import { Port } from "../../db/models/Port";

export async function parseAndSaveScan(filePath: string): Promise<null | any> {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    var jsonData: any = null;
    jsonData = await parseStringPromise(file);
    console.log(JSON.stringify(jsonData));
    /* 
    // TODO: create a Scan entry 
    */
    const runstats = jsonData.nmaprun?.runstats[0];
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
    const hosts = jsonData.nmaprun?.host;

    /*
    // TODO: For each host in scan create a host entry
    */
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
      /*
      // TODO: for each port in each host create a port entry
      */
      const extraPorts = host.ports?.[0].extraports ?? [];

      const ports = host.ports?.[0]?.port ?? [];
      for (const port of ports) {
        const st = port.state[0].$;
        const serv = port.service?.[0]?.$;
        const cpe = port.service?.[0]?.cpe;
        const newPort = await Port.create({
          portNumber: parseInt(port.$.portid),
          host_id: newHost.id,
          protocol: port.$.protocol,
          state: st.state,
          reason: st?.reason,
          reason_ttl: parseInt(st?.reason_ttl, 10),
          service_name: serv?.name,
          service_product: serv?.product,
          service_method: serv?.method,
          service_version: serv?.version,
          cpe: cpe[0],
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
