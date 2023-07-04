import express from "express";
import { config } from "./config.js";
import { appConfigInstaller } from "./app-config-installer.js";
import { connectToDb } from "./db-connect.js";

const startServer = async () => {
  const app = express();

  // for injecting middleware
  await appConfigInstaller(app);

  // connecting to DB
  await connectToDb(config.DB_URL);

  app
    .listen(config.PORT, () => {
      console.log(`listening to port ${config.PORT}`);
    })
    .on("error", (err) => {
      console.log(err);
      process.exit();
    });
};

startServer();
