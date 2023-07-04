import express from "express";
import cors from "cors";
import userRouter from "./routes/auth-routes.js";
import taskRouter from "./routes/task-routes.js";
import { errorHandler } from "./utils/error-handlers.js";

const appConfigInstaller = async (app) => {
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true, limit: "1mb" }));
  const corsOptions = {
    origin: 'http://localhost:5173/', // Allow requests from this origin
    methods: ['GET', 'POST'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
  };
  
  app.use(cors(corsOptions));

  // API's
  app.use("/tasks", taskRouter); // task management
  app.use("/users", userRouter); // authentication

  // Error handling
  app.use(errorHandler);
};

export { appConfigInstaller };
