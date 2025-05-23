import { Router } from "express";

import { listScans, getScan, getLatest } from "../controllers/dataControllers";

// router for '/data' route
const dbRouter = Router();

dbRouter

  .get("/", listScans)
  // api route to query the database for the most recent scan
  .get("/latest", getLatest)
  // api route to query database for a specific scans details
  .get("/:id", getScan);

export default dbRouter;
