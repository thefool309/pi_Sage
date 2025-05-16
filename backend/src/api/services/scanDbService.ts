import { Json } from "sequelize/types/utils";
import { Scan } from "../../db/models/Scan";
import fs from "fs/promises";
import { parseStringPromise } from "xml2js";
import { Host } from "../../db/models/Host";

export async function parseAndSaveScan(filePath: string): Promise<null | any> {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    var jsonData: any = null;
    jsonData = await parseStringPromise(file);
    console.log(JSON.stringify(jsonData));
    /* 
    // TODO: create a Scan entry 
    */
    const scan = await Scan.create({
      scan_results: jsonData,
      duration: jsonData.runstats.finished.elapsed,
      host_count: jsonData.runstats.hosts.total,
      host_down: jsonData.runstats.hosts.down,
      host_up: jsonData.runstats.hosts.up,
      exit_success: jsonData.runstats.finished.exit,
      summary: jsonData.runstats.finished?.summary,
    });
    const hosts = jsonData.nmaprun?.host;
    // TODO: For each host in scan create a host entry
    for (const host of hosts) {
      Host.create({
        scanId: scan.id,
        status: host.status.$.state,
        reason: host.status.$.reason,
        reason_ttl: host.status.$.reason_ttl,
        addr: host.address[0].$.addr,
        addr_type: host.address[0].$.addrtype,
        mac_addr: host.address[1]?.$.addr,
        vendor: host.address[1]?.$.addr,
      });
    }
    // TODO: for each port in each host create a port entry
    return jsonData;
  } catch (err) {
    console.error("There was an error parsing and saving the scan", err);
    return null;
  }
}
