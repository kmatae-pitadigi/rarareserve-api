import { ObjectType, Field } from 'type-graphql';
import { ISaveCourseResult } from '../interfaces/isave-course-result.interface';

@ObjectType()
export class SaveCourseResult implements ISaveCourseResult {
    @Field()
    result: boolean;

    @Field()
    message: string;
}
