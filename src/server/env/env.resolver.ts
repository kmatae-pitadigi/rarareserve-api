import 'reflect-metadata';
import { Resolver, Query, Args } from '@nestjs/graphql';
import { IEnvResult } from './interfaces/ienv-result.interface';
import { EnvService } from './env.service';
import { EnvResult } from './dto/env-result.dto';

@Resolver(of => EnvResult)
export class EnvResolver {
    constructor(
        private readonly envService: EnvService
    ) {}

    @Query(returns => EnvResult)
    env(@Args('id') id: string): Promise<EnvResult> {
        return new Promise((resolve, reject) => {
            this.envService.getEnv()
            .then((envResult: IEnvResult) => {
                resolve(envResult);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
