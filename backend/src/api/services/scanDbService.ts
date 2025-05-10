import { Json } from "sequelize/types/utils";
import { Scan } from "../../db/models/Scan";
import fs from 'fs/promises';

export async function parseAndSaveScan(filePath: string) {
    // Parse JSON data
    const file =  await fs.readFile(filePath, 'utf-8');
    const jsonData = JSON.parse(file);
    // Create Scan entry
    
    // For each host in scan create a host entry
    //for each port in each host create a port entry
}