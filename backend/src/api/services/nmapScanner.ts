import { spawn } from 'child_process';

export function runNmap(target: string | undefined): Promise<string> {
    return new Promise((resolve, reject) => {
        if(target == undefined){
            return reject(`Target is undefined`);
        }
        const command = 'nmap';
        // Add -vv for more verbosity if needed
        const args = ['-T4', '-vv', '-sV', '-F',  target];
    
        const nmapProcess = spawn(command, args);
    
        let output = '';
        nmapProcess.stdout.on('data', (data) => {
          output += data.toString();
          console.log(data.toString());
        });
    
        nmapProcess.stderr.on('data', (data) => {
          console.error(`Nmap stderr: ${data}`);
        });
    
        nmapProcess.on('error', (error) => {
          reject(`Error: ${error.message}`);
        });
    
        nmapProcess.on('close', (code) => {
          if (code !== 0) {
            return reject(`Nmap process exited with code ${code}`);
          }
          resolve(output);
        });
    });
}