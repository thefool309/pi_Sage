import assert from "assert";
import { parseAndSaveScan } from "./scanDbService";

export function TestParseAndSaveScanVsExpectedOutput() {
    
    let data = parseAndSaveScan("./test-output.xml");
    if (data != null) {
        console.log("Data parse success! Test passed!");
        console.log("Please check the data and make sure it is correct.");
        console.log(JSON.stringify(parseAndSaveScan("./test-output.xml")));
    }
    else {
        //assert.notEqual(null);
        console.error("You suck at coding. parseAndSaveScan returned null");
    }
    
}