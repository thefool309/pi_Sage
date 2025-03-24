import { spawn } from 'child_process';

export function runNmap(target: string | undefined): Promise<string> {
    return new Promise((resolve, reject) => {
        if(target == undefined){
            return reject(`Target is undefined`);           //error checking in case target is undefined
        }
        const command = 'nmap';
        // Add -vv for more verbosity if needed
        const args = ['-T4', '-v', '-sV', '-F',  target];
    
        const nmapProcess = spawn(command, args);
    
        let output = '';
        nmapProcess.stdout.on('data', (data) => {       //successfull output
          output += data.toString();
          console.log(data.toString());
        });
    
        nmapProcess.stderr.on('data', (data) => {       //stderr won't halt the process but will print an error to the console for debugging
          console.error(`Nmap stderr: ${data}`);
        });
    
        nmapProcess.on('error', (error) => {            // on an error we send a rejection carrying the error message. 
          reject(`Error: ${error.message}`);
        });
    
        nmapProcess.on('close', (code) => {             //if nmap exited with an error code reject with that code. 
          if (code !== 0) {
            return reject(`Nmap process exited with code ${code}`);
          }
          resolve(output);
        });
    });
}