import { runNmap } from "../services/nmapScanner";

import { Request, Response, Router } from "express";

import dotenv from "dotenv";
import chalk from "chalk";

dotenv.config();

let cachedData: string | null = null;
let lastScan: number = 0;
let CACHE_TIMEOUT = 15 * 60 * 1000;

let ongoingScanPromise: Promise<string> | null = null;

const outputPath = "./src/api/services/.nmap-output/output.xml";
let args: string[] = ["-T4", "-v", "-sV", "-F", "-oX", outputPath];
const localnetwork = process.env.LOCAL_NETWORK;
const nMapRouter = Router();
nMapRouter.post("/", async (req: Request, res: Response) => {
  //here we create a router for all nmap requests in case we want
  try {
    // to create subroutes for different scan options
    const now = Date.now();

    if (now - lastScan < CACHE_TIMEOUT) {
      //return cached scan data if the cache hasn't timed out
      console.log("Returning last cached scan");
      res.send(cachedData);
      return;
    }

    if (ongoingScanPromise) {
      //if currently scanning then await the ongoing scanPromise
      console.log("awaiting ongoing scan");
      const result = await ongoingScanPromise;
      res.send(result);
      return;
    }

    console.log("Starting new scan");

    ongoingScanPromise = runNmap(localnetwork);
    const result = await ongoingScanPromise;

    cachedData = result;
    lastScan = now;

    ongoingScanPromise = null;

    res.send(result);
  } catch (error) {
    console.error(
      "Backend" + chalk.red(" failed ") + "to resolve runNmap Error: ",
      error // added in error printing in the console
    ); // because even after reading the source and seeing
    // that it's sending the error as a response
    // some don't think to check the browser's console
    res.status(500).send(error);
  }
  // TODO: Add scan route for scan without '-F'

  /* TODO: Add scan route for scans with varying Timing Templates('-T{x}')
    where x = the timing template level you're shooting for
   -T0 = quietest and slowest, -T5 =  fastest and loudest */
});

export default nMapRouter;
