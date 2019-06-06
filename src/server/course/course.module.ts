import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseService } from './course.service';
import { CourseResolver } from './course.resolver';
import { Course } from './dto/course.dto';

@Module({
    imports: [
        TypeOrmModule.forFeature([Course])
    ],
    providers: [
        CourseService,
        CourseResolver
    ],
    exports: [
        CourseService
    ]
})
export class CourseModule {}
