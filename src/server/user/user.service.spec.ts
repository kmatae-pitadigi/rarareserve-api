import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { AppModule } from '../app.module';
import { UserModule } from './user.module';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UserModule
      ],
      providers: [
        UserService
      ]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
