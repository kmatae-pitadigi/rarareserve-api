import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddPartner1557265425652 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'partner',
            columns: [
                {
                    name: 'id',
                    type: 'uniqueidentifier',
                    isPrimary: true,
                    isNullable: false,
                    default: 'newid()'
                },
                {
                    name: 'userid',
                    type: 'uniqueidentifier',
                    isNullable: false
                },
                {
                    name: 'name',
                    type: 'nvarchar(255)',
                    isNullable: false
                },
                {
                    name: 'kana',
                    type: 'nvarchar(255)',
                    isNullable: false
                },
                {
                    name: 'createdAt',
                    type: 'datetime',
                    isNullable: false,
                    default: 'getdate()'
                },
                {
                    name: 'updatedAt',
                    type: 'datetime',
                    isNullable: false,
                    default: 'getdate()'
                },
                {
                    name: 'sex',
                    type: 'smallint',
                    isNullable: false,
                    default: 0
                }
            ],
            indices: [
                {
                    columnNames: [
                        'userid'
                    ],
                    isUnique: false
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('partner');
    }

}