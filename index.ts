import dotenv from "dotenv";
import "reflect-metadata";
import server from "@/server";
import database from "@/database/config";

const init = async () => {
  dotenv.config();

  server.serve();

  await database.connect();
};

init()
  .then()
  .catch((error) => {
    throw error;
  });
