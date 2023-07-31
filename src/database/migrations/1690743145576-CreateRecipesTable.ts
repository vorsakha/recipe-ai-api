import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateRecipesTable1690743145576 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);

    await queryRunner.createTable(
      new Table({
        name: "recipe",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "title",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "rules",
            type: "varchar",
            isArray: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      "recipe",
      new TableForeignKey({
        columnNames: ["user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "CASCADE",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable("recipe");
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf("user_id") !== -1,
    );

    if (foreignKey) {
      await queryRunner.dropForeignKey("recipe", foreignKey);
    }

    await queryRunner.dropTable("recipe");
  }
}
