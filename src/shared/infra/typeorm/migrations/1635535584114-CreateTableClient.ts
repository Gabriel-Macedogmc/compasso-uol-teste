import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTableClient1635535584114 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "client",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "full_name",
            type: "varchar",
            length: "70",
          },
          {
            name: "sex",
            type: "varchar",
            length: "13",
            default: "'Não Informado'",
          },
          {
            name: "birth_date",
            type: "varchar",
            length: "10",
          },
          {
            name: "age",
            type: "varchar",
            length: "3",
          },
          {
            name: "city_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["city_id"],
            referencedColumnNames: ["id"],
            referencedTableName: "cities",
            name: "CITY_ID",
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("client");
  }
}
