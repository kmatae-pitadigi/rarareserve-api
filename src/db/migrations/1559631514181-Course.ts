import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Course1559631514181 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'course',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'no',
                    type: 'integer',
                    isNullable: true
                },
                {
                    name: 'name',
                    type: 'varchar(255)',
                    isNullable: false
                },
                {
                    name: 'description1',
                    type: 'varchar(500)',
                    isNullable: true
                },
                {
                    name: 'description2',
                    type: 'varchar(500)',
                    isNullable: true
                },
                {
                    name: 'description3',
                    type: 'varchar(500)',
                    isNullable: true
                },
                {
                    name: 'starttime',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'endtime',
                    type: 'timestamp',
                    isNullable: true
                },
                {
                    name: 'color',
                    type: 'varchar(10)',
                    isNullable: true
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()'
                },
                {
                    name: 'updatedAt',
                    type: 'timestamp',
                    isNullable: false,
                    default: 'now()'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('course');
    }

}
