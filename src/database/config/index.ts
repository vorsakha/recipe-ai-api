import { DataSource } from "typeorm";
import AppDataSource from "./datasource.config";

const connect = async (): Promise<DataSource> => {
  return AppDataSource.initialize();
};

export default { connect };
