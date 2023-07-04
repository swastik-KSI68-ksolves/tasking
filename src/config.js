import dotEnv from "dotenv";

dotEnv.config();

export const config = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,
};

