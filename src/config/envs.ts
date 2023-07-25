import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE, DB_PORT, PORT } =
  process.env;

const config = {
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  PORT,
};

export default config;
