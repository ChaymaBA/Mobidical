import "reflect-metadata";

import dotenv from 'dotenv';
import express from 'express';
import { initializeRoutes } from "./api/routes";

import { AppDataSource } from './core/configuration/data-source';
import helmet from "helmet";
// Load environment-specific .env file
dotenv.config({ path: process.env.ENV_FILE || '.env' });

const app = express();
// Middleware setup
app.use(helmet()); // Adds various HTTP headers for security
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});


AppDataSource.initialize()
  .then(() => {
    app.use('/api', initializeRoutes());
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });
