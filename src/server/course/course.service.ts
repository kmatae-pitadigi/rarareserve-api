import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './dto/course.dto';
import { ISaveCourseResult } from './interfaces/isave-course-result.interface';

@Injectable()
export class CourseService {
    constructor(
        @InjectRepository(Course)
        private readonly courseRepository: Repository<Course>
    ) {}

    /**
     * コース情報を取得する
     */
    findAll(_available: boolean): Promise<Course[]> {
        return new Promise((resolve, reject) => {
            let findParam;
            if (_available) {
                findParam = {where: {available: true}, order: {no: 'ASC'}};
            }
            else {
                findParam = {order: {no: 'ASC'}};
            }
            this.courseRepository.find(findParam)
            .then((_courses: Course[]) => {
                resolve(_courses);
            })
            .catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * コースを保存する
     * @param _course コース情報
     * @returns コース保存結果
     */
    save(_course: Course): Promise<ISaveCourseResult> {
        return new Promise((resolve, reject) => {
            // コース情報を保存する
            this.courseRepository.save(_course)
            .then((course: Course) => {
                resolve({
                    result: true,
                    message: ''
                });
            })
            .catch((err) => {
                reject(err);
            });
        });
    }
}
