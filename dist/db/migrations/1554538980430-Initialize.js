"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
class Initialize1554538980430 {
    up(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.createTable(new typeorm_1.Table({
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
            yield queryRunner.createTable(new typeorm_1.Table({
                name: 'siteconfig',
                columns: [
                    {
                        name: 'id',
                        type: 'smallint',
                        isPrimary: true,
                        isNullable: false
                    },
                    {
                        name: 'name',
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
        });
    }
    down(queryRunner) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable('user');
            yield queryRunner.dropTable('siteconfig');
        });
    }
}
exports.Initialize1554538980430 = Initialize1554538980430;
