import { DataSource } from "typeorm";
import { config } from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: config.DBPORT,
  username: config.DB_ROLE,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,
  synchronize: true,
  logging: true,
  entities: [__dirname + "/entities/*{js,ts}"],
  subscribers: [],
  migrations: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
