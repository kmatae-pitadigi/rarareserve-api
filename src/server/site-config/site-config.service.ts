import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { SiteConfig } from './site-config';
import { ISiteConfig } from './interfaces/isite-config.interface';
import { ISaveSiteConfig } from './interfaces/isave-site-config.interface';
import * as fs from 'fs';
import { multerConfig } from '../config/multer.config';
import * as DataURI from 'datauri';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class SiteConfigService {
    constructor(
        @InjectRepository(SiteConfig)
        private readonly siteConfigRepogitory: Repository<SiteConfig>
    ) {}

    get(): Promise<ISiteConfig> {
        return new Promise((resolve, reject) => {
            this.siteConfigRepogitory.findOne(1)
            .then((siteConfig: ISiteConfig) => {
                resolve(siteConfig);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    save(_saveSiteConfig: ISaveSiteConfig): Promise<void | {}> {
        return new Promise((resolve, reject) => {
            // idは必ず1固定とする
            _saveSiteConfig.id = 1;
            this.siteConfigRepogitory.update({id: _saveSiteConfig.id}, _saveSiteConfig)
            .then((_updateResult: UpdateResult) => {
                // ヘッダーイメージ、フッターイメージがアップロードされていたら更新する
                Promise.resolve()
                .then(() => {
                    this.loadImageUri(_saveSiteConfig.headerimagefilename)
                    .then((dataUri: string) => {
                        if (dataUri) {
                            this.saveImageUri(_saveSiteConfig.id, dataUri, {headerimage: dataUri})
                            .then((result: boolean) => {
                                resolve(result);
                            })
                            .catch((err) => {
                                reject(err);
                            });
                        }
                        else {
                            resolve(true);
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
                })
                .then(() => {
                    this.loadImageUri(_saveSiteConfig.footerimagefilename)
                    .then((dataUri: string) => {
                        if (dataUri) {
                            this.saveImageUri(_saveSiteConfig.id, dataUri, {footerimage: dataUri})
                            .then((result: boolean) => {
                                resolve(result);
                            })
                            .catch((err) => {
                                reject(err);
                            });
                        }
                        else {
                            resolve(true);
                        }
                    })
                    .catch((err) => {
                        reject(err);
                    });
                });
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    private saveImageUri(_id: number, _imageUri: string, _partialEntity: QueryDeepPartialEntity<SiteConfig>): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (_imageUri) {
                this.siteConfigRepogitory.update({id: _id}, _partialEntity)
                .then((_updateResult: UpdateResult) => {
                    resolve(true);
                })
                .catch((err) => {
                    reject(err);
                });
            }
            else {
                resolve(true);
            }
        });
    }

    private loadImageUri(_fileName: string): Promise<string> {
        return new Promise((resolve, reject) => {
            if (!_fileName) {
                resolve(undefined);
            }
            else {
                const fileName: string = multerConfig.dest + '/' + _fileName;
                // ファイルがあるかを確認する
                if (!fs.existsSync(fileName)) {
                    resolve(undefined);
                }
                else {
                    const dataUri = new DataURI();
                    dataUri.on('encoded', (content) => {
                        fs.unlinkSync(fileName);
                        resolve(content);
                    });
                    dataUri.on('error', (err) => {
                        reject(err);
                    });
                    dataUri.encode(fileName);
                }
            }
        });
    }
}
