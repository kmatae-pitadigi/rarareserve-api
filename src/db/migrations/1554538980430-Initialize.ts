import {MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Initialize1554538980430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'uniqueidentifier',
                    isPrimary: true,
                    isNullable: false,
                    default: 'newid()'
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
                    name: 'email',
                    type: 'nvarchar(255)',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'postcode',
                    type: 'nvarchar(255)',
                    isNullable: false
                },
                {
                    name: 'address',
                    type: 'nvarchar(255)',
                    isNullable: false
                },
                {
                    name: 'phone',
                    type: 'nvarchar(255)',
                    isNullable: false
                },
                {
                    name: 'role',
                    type: 'smallint',
                    isNullable: false,
                    default: 0
                },
                {
                    name: 'isemailconfirmed',
                    type: 'bit',
                    isNullable: false,
                    default: 0
                },
                {
                    name: 'ispasswordreset',
                    type: 'bit',
                    isNullable: false,
                    default: 0
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
                    name: 'password',
                    type: 'nvarchar(255)',
                    isNullable: false
                },
                {
                    name: 'sex',
                    type: 'smallint',
                    isNullable: false,
                    default: 0
                }
            ]
        }), true);

        await queryRunner.createTable(new Table({
            name: 'siteconfig',
            columns: [
                {
                    name: 'id',
                    type: 'smallint',
                    isPrimary: true,
                    isNullable: false
                },
                {
                    name: 'sitename',
                    type: 'nvarchar(255)',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'nvarchar(255)',
                    isNullable: false
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable('user');
        await queryRunner.dropTable('siteconfig');
    }

}
