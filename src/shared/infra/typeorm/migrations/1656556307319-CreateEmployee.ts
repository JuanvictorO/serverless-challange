import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEmployee1656556307319 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'employee',
          columns: [
            {
              name: 'id',
              type: 'varchar',
              isPrimary: true,
              generationStrategy: 'uuid',
            },
            {
              name: 'name',
              type: 'varchar',
              length: '100',
            },
            {
              name: 'birthday',
              type: 'date',
            },
            {
              name: 'office_id',
              type: 'varchar',
            }
          ],
          foreignKeys: [
            {
              name: 'EmployeeOffice',
              columnNames: ['office_id'],
              referencedColumnNames: ['id'],
              referencedTableName: 'office',
              onDelete: 'RESTRICT',
              onUpdate: 'CASCADE',
            },
          ]
        }),
      );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('employee');
    }

}
