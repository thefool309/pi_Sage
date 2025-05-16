import { spawn } from "child_process";
import fs from "fs/promises";
import { parseStringPromise } from "xml2js";
import { deleteXmlFile } from "./deleteXmlFile";

export async function runNmap(
  target: string | undefined,
  _args: string[] | undefined
): Promise<string> {
  return new Promise((resolve, reject) => {
    if (target == undefined) {
      return reject(`Target is undefined`); //error checking in case target is undefined
    }
    const command = "nmap";
    const outputPath = "./src/api/services/.nmap-output/output.xml";
    // Add -vv for more verbosity if needed
    // -T4 is for speed -v is for verbosity -sV detects the version of services running on open ports
    // -F is for fast, and -oX outputs to an xml file
    let args: string[];
    if (_args == undefined) {
      args = ["-T4", "-v", "-sV", "-F", "-oX", outputPath, target];
    } else {
      args = _args;
    }
    const nmapProcess = spawn(command, args);

    let output = "";
    nmapProcess.stdout.on("data", (data) => {
      //successful output
      output += data.toString();
      console.log(data.toString());
    });

    nmapProcess.stderr.on("data", (data) => {
      //stderr won't halt the process but will print an error to the console for debugging
      console.error(`Nmap stderr: ${data}`);
    });

    nmapProcess.on("error", (error) => {
      // on an error we send a rejection carrying the error message.
      reject(`Error: ${error.message}`);
    });

    nmapProcess.on("close", async (code) => {
      //if nmap exited with an error code reject with that code.
      if (code !== 0) {
        return reject(`Nmap process exited with code ${code}`);
      }
      try {
        // TODO: pass filePath to parseAndSaveScan helper function
        const xmlData = await fs.readFile(outputPath, "utf-8"); // convert xml file to string
        var jsonData = await parseStringPromise(xmlData);
        deleteXmlFile(xmlData);
        resolve(JSON.stringify(jsonData));
      } catch (err) {
        reject(`Failed to read or parse JSON ouput: ${err}`);
      }
    });
  });
}
