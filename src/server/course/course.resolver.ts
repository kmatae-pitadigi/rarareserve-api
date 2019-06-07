import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtauthguard';
import { Roles } from '../guards/decorators/roles.decorator';
import { Course } from './dto/course.dto';
import { CourseService } from './course.service';
import { SaveCourseResult } from './dto/save-course-result.dto';

@Resolver(of => Course)
export class CourseResolver {
    constructor(
        private readonly courseService: CourseService
    ) {}

    @UseGuards(JwtAuthGuard)
    @Roles(2)
    @Query(returns => [Course])
    getcourses(@Args('available') _available: boolean, @Context() ctx: any): Promise<Course[]> {
        return new Promise((resolve, reject) => {
            this.courseService.findAll(_available)
            .then((_courses: Course[]) => {
                reject(_courses);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    @UseGuards(JwtAuthGuard)
    @Roles(2)
    @Mutation(returns => SaveCourseResult)
    savecourse(@Args('course') _course: Course, @Context() ctx: any): Promise<SaveCourseResult> {
        return new Promise((resolve, reject) => {
            this.courseService.save(_course)
            .then((_saveCourseResult: SaveCourseResult) => {
                resolve(_saveCourseResult);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
