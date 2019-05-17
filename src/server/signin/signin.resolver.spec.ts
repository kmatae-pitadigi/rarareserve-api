import { Test, TestingModule } from '@nestjs/testing';
import { SigninResolver } from './signin.resolver';
import { AppModule } from '../app.module';
import { SigninModule } from './signin.module';

describe('SigninResolver', () => {
  let resolver: SigninResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        SigninModule
      ],
      providers: [
        SigninResolver
      ],
    }).compile();

    resolver = module.get<SigninResolver>(SigninResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
