import { Test, TestingModule } from '@nestjs/testing';
import { SigninService } from './signin.service';
import { AppModule } from '../app.module';
import { SigninModule } from './signin.module';

describe('SigninService', () => {
  let service: SigninService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        SigninModule
      ],
      providers: [
        SigninService
      ]
    }).compile();

    service = module.get<SigninService>(SigninService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
