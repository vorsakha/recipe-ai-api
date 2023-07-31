import { DataSource } from "typeorm";
import AppDataSource from "@database/config/datasource.config";

const connect = async (): Promise<DataSource> => {
  return AppDataSource.initialize();
};

export default { connect };
