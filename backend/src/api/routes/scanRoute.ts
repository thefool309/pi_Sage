import { runNmap } from "../services/nmapScanner";

import  { Request, Response, Router } from "express";

import dotenv from 'dotenv'

dotenv.config();
const localnetwork = process.env.LOCAL_NETWORK
const nMapRouter = Router();
nMapRouter.get( "/", async (req: Request, res: Response) => {
    try {
        const result = await runNmap(localnetwork);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default nMapRouter;
