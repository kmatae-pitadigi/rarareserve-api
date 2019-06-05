import { Course } from './course.dto';

describe('Course', () => {
  it('should be defined', () => {
    expect(new Course()).toBeDefined();
  });
});
