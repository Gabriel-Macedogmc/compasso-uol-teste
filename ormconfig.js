
let database = {
  type: "postgres",
  host:
    process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USERNAME,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_NAME,
  entities: [`./src/modules/**/infra/typeorm/models/*{.ts,.js}`],
  migrations: [`./src/shared/infra/typeorm/migrations/*{.ts,.js}`],
  cli: {
    migrationsDir: `./src/shared/infra/typeorm/migrations`,
  },
};

let testDatabase = {
  type: "sqlite",
  database: "./src/shared/infra/typeorm/migrations/database.test.sqlite",
  migrations: ["./src/shared/infra/typeorm/migrations/*.ts"],
  entities: ["./src/modules/**/models/**.ts"],
  cli: {
    migrationsDir: "./src/shared/infra/typeorm/migrations"
  }
}
module.exports =
  process.env.NODE_ENV === "test"
    ? testDatabase
    : database;
