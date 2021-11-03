import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (name?: string): Promise<Connection> => {
  if (process.env.NODE_ENV === "test") {
    const sqlite = await getConnectionOptions();
    return createConnection(sqlite);
  }

  const defaultOptions = await getConnectionOptions(name);
  return createConnection(defaultOptions);
};
