import { DataSource, EntityTarget } from "typeorm";
import { ThalaData } from "./models";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "localhost123",
  database: "example_event",
  synchronize: true,
  logging: true,
  entities: [ThalaData],
});

export const initDatabase = async () => {
  await AppDataSource.initialize();
};

export const buckInsert = (
  allObjects: any[],
  type: EntityTarget<ThalaData | Event>,
) => {
  return AppDataSource.transaction(async (txnManager) => {
    const chunkSize = 100;
    for (let i = 0; i < allObjects.length; i += chunkSize) {
      const chunk = allObjects.slice(i, i + chunkSize);
      await txnManager.insert(type, chunk);
    }

    return;
  });
};
