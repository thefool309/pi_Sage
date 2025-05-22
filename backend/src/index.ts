import dotenv from "dotenv";
const result = dotenv.config();
if (result.error) {
  console.error("Error loading .env file:", result.error);
}
console.log("Parsed .env variables:", result.parsed);

import express, { Request, Response } from "express";
import { connectDB, sequelize } from "./db/database";
import cors from "cors";
import { User } from "./db/models/ExampleUser"; //import models

import nMapRouter from "./api/routes/scanRoutes";

const app = express();

app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

connectDB().then(async () => {
  try {
    console.log("All models were synchronized successfully.\n");
  } catch (syncError) {
    console.error("Error synchronizing models: ", syncError, "\n");
  }
});

app.get("/status", (request: Request, response: Response) => {
  response.send("Server is active and running...\n");
});

app.use("/scan", nMapRouter); // here we map the nMapRouter to /scan in the root project
// so we can access it's functionality via <insert-host-name>:3000/scan

// TODO: map the dbRouter to '/data' so we can expose the endpoints mapped to the dbRouter

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the pi_Shield API");
});

app.listen(PORT, () => {
  console.log("Server Listening on PORT:", PORT, "\n");
});
