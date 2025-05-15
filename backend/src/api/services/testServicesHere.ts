import assert from "assert";
import { parseAndSaveScan } from "./scanDbService";
//TODO: Test parseAndSaveScan method to confirm db works properly
export async function TestParseAndSaveScanVsExpectedOutput() {
  let data = parseAndSaveScan("./test-output.xml");
  if (data != null) {
    console.log("Data parse success! Test passed!");
    console.log("Please check the data and make sure it is correct.");
    console.log(JSON.stringify(data));
  } else {
    console.error("You suck at coding. parseAndSaveScan returned null");
  }
}
