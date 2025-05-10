import { Json } from "sequelize/types/utils"
import { Scan } from "../../db/models/Scan"

export async function parseAndSaveScan(jsonData:Json) {
    // Parse JSON data
    // Create Scan entry
    
    // For each host in scan create a host entry
    //for each port in each host create a port entry
}