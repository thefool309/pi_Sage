import { Json } from "sequelize/types/utils";
import { Scan } from "../../db/models/Scan";
import fs from "fs/promises";
import { parseStringPromise } from "xml2js";

export async function parseAndSaveScan(filePath: string): Promise<null | any> {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    var jsonData: any = null;
    jsonData = await parseStringPromise(file);
    console.log(JSON.stringify(jsonData));
    // Create Scan entry
    // TODO: create a Scan entry

    const hosts = jsonData.nmaprun?.host;
    // TODO: For each host in scan create a host entry
    // TODO: for each port in each host create a port entry
    return jsonData;
  } catch (err) {
    console.error("There was an error parsing and saving the scan", err);
    return null;
  }
}
