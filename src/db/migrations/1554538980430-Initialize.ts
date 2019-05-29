import {MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Initialize1554538980430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'name',
                    type: 'varchar(255)',
                    isNullable: false
                },
                {
                    name: 'kana',
                    type: 'varchar(255)',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar(255)',
                    isNullable: false,
                    isUnique: true
                },
                {
                    name: 'postcode',
                    type: 'varchar(255)',
                    isNullable: true
                },
                {
                    name: 'address',
                    type: 'varchar(255)',
                    isNullable: true
                },
                {
                    name: 'phone',
                    type: 'varchar(255)',
                    isNullable: true
                },
                {
                    name: 'role',
                    type: 'smallint',
                    isNullable: false,
                    default: 0
                },
                {
                    name: 'isemailconfirmed',
                    type: 'boolean',
                    isNullable: false,
                    default: false
                },
                {
                    name: 'ispasswordreset',
                    type: 'boolean',
                    isNullable: false,
                    default: false
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
                },
                {
                    name: 'password',
                    type: 'varchar(255)',
                    isNullable: false
                },
                {
                    name: 'sex',
                    type: 'smallint',
                    isNullable: false,
                    default: 0
                },
                {
                    name: 'birthday',
                    type: 'date',
                    isNullable: true
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
                    type: 'varchar(255)',
                    isNullable: false
                },
                {
                    name: 'email',
                    type: 'varchar(255)',
                    isNullable: false
                },
                {
                    name: 'headerimagefilename',
                    type: 'varchar(255)',
                    isNullable: true
                },
                {
                    name: 'headerimage',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'toppage',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'footerpage',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'footerimagefilename',
                    type: 'varchar(255)',
                    isNullable: true
                },
                {
                    name: 'footerimage',
                    type: 'text',
                    isNullable: true
                },
                {
                    name: 'changeemailconfirm',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'emailconfirm',
                    type: 'text',
                    isNullable: false
                },
                {
                    name: 'resetpassword',
                    type: 'text',
                    isNullable: false
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

        await queryRunner.createTable(new Table({
            name: 'partner',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    isNullable: false,
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'userid',
                    type: 'uuid',
                    isNullable: false
                },
                {
                    name: 'name',
                    type: 'varchar(255)',
                    isNullable: false
                },
                {
                    name: 'kana',
                    type: 'varchar(255)',
                    isNullable: false
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
                },
                {
                    name: 'sex',
                    type: 'smallint',
                    isNullable: false,
                    default: 0
                },
                {
                    name: 'birthday',
                    type: 'date',
                    isNullable: false
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
        await queryRunner.dropTable('user');
        await queryRunner.dropTable('siteconfig');
    }

}
