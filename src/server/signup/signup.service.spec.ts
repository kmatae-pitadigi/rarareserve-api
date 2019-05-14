import { Test, TestingModule } from '@nestjs/testing';
import { SignupService } from './signup.service';
import { AppModule } from '../app.module';
import { SignupModule } from './signup.module';

describe('SignupService', () => {
  let service: SignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        SignupModule
      ],
      providers: [
        SignupService
      ]
    }).compile();

    service = module.get<SignupService>(SignupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
