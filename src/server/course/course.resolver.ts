import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtauthguard';
import { Roles } from '../guards/decorators/roles.decorator';
import { Course } from './dto/course.dto';
import { CourseService } from './course.service';

@Resolver(of => Course)
export class CourseResolver {
    constructor(
        private readonly courseService: CourseService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Roles(2)
    @Query(returns => [Course])
    getcourses(@Context() ctx: any): Promise<Course[]> {
        return new Promise((resolve, reject) => {
            this.courseService.findAll()
            .then((_courses: Course[]) => {
                reject(_courses);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
