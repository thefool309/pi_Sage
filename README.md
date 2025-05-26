# pi_Sage

Welcome to pi_Sage. pi_Sage is currently in a state of active development, and will be until at least the end of May 2025. This is a project I am doing for school, so no contributions will be accepted until I recieve my final grade. 

please refer to the [wiki](https://github.com/thefool309/pi_Sage/wiki) for further documentation

## ***IMPORTANT DISCLAIMER*** 
***nmap is an open source security tool for scanning ports, that is used by cyber security professionals, and sys admins. There is a lot of controversy around port scanning, so don't do anything to get yourself arrested, or sued. Do not run this software on a network you aren't an admin of, or have expressed permission to scan open ports on. You can read more about the legal issues surrounding port scanning [here](https://nmap.org/book/legal-issues.html). I am not a lawyer however and if you have any real questions surrounding the legality of using nmap you should consult a lawyer.***

## What is pi_Sage? 

 This is currently a web dashboard for the command line tool, [nmap](https://nmap.org/docs.html). The long term goal is to help the user visualize their nmap scans in a way that will make the data easier to digest. pi_Sage is part of an overarching project to develop a raspberry pi based security appliance. This is however a docker managed project, and can be deployed on anything that can run Docker. 

 ## How do I use pi_Sage?

 Currently I have only tested this software on linux based systems, but in theory you should be able to deploy it with docker-compose on Linux, Mac, or Windows. For more information on using docker and docker-compose, please consult the [docker documentation](https://docs.docker.com/).

 for cli use you should navigate to the directory in which the [`docker-compose.yaml`](./docker-compose.yaml) file is in, and run the following command
 
 ```bash
 docker compose up --build
 ```

 The logs for the frontend container should spit back the url for the web dashboard, this will be different depending on your local ip address. To access the container on a machine OTHER than the one you launched it on you must open the corresponding ports (3000, and 5173 by default) in the [`docker-compose.yaml`](./docker-compose.yaml). The scan will begin running from the backend when you open the web dashboard, and currently runs on a 5 second timer, with a 15 minute cache. There is a button that manually refreshes the scan results. These values may be subject to change in the future. You can access our nmap API from port 3000 by default. 

 ## Contribution Guidelines

 To be fair, currently I don't have any, and no contributions will be accepted until after the end of May 2025. You're more than welcome to fork the repo and use the code however you want, so long as you follow the terms of the [License](./LICENSE). 
