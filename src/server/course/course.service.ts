import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './dto/course.dto';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) {}

    /**
     * コース情報を取得する
     */
    findAll(): Promise<Course[]> {
        return new Promise((resolve, reject) => {
            this.courseRepository.find({order: {no: 'ASC'}})
            .then((_courses: Course[]) => {
                resolve(_courses);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
