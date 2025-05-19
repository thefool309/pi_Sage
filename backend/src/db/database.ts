import { Sequelize } from "sequelize";
import { Scan } from "./models/Scan";
import { Host } from "./models/Host";
import { Port } from "./models/Port";

import dotenv from "dotenv";

const result = dotenv.config();

const MYSQL_URI =
  process.env.MYSQL_URI ||
  `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`;

export const sequelize = new Sequelize(MYSQL_URI, {
  logging: true,
});

async function waitForDb(retries = 10) {
  for (let i = 0; i < retries; i++) {
    try {
      await sequelize.authenticate();
      return;
    } catch {
      await new Promise((r) => setTimeout(r, 2000));
    }
  }
  throw new Error("DB never came up");
}

export const connectDB = async () => {
  try {
    //Test the connection
    await waitForDb();
    await sequelize.sync({ alter: true }); // this should synchronize all models to database
    console.log("Connection to MYSQL database succeeded");
  } catch (error) {
    console.error("Unable to connect to the MYSQL database: ", error, "\n");
    process.exit(1); //exit with error code if unable to connect
  }
};
