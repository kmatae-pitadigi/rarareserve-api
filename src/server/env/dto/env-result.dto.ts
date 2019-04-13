import 'reflect-metadata';
import { ObjectType, Field,  } from 'type-graphql';
import { IEnvResult } from '../interfaces/ienv-result.interface';

@ObjectType()
export class EnvResult implements IEnvResult {
    @Field()
    serviceName: string;
}
