import dotenv from "dotenv";

dotenv.config();

const {
  DB_HOST,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  DB_PORT,
  PORT,
  AUTH_JWT_SECRET,
  AUTH_JWT_REFRESH_SECRET,
} = process.env;

const config = {
  DB_HOST: DB_HOST || "",
  DB_USERNAME: DB_USERNAME || "",
  DB_PASSWORD: DB_PASSWORD || "",
  DB_DATABASE: DB_DATABASE || "",
  DB_PORT: DB_PORT || "",
  PORT: PORT || "",
  AUTH_JWT_SECRET: AUTH_JWT_SECRET || "",
  AUTH_JWT_REFRESH_SECRET: AUTH_JWT_REFRESH_SECRET || "",
};

export default config;
