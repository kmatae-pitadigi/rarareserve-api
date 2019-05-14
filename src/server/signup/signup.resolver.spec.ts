import { Test, TestingModule } from '@nestjs/testing';
import { SignupResolver } from './signup.resolver';
import { AppModule } from '../app.module';
import { SignupModule } from './signup.module';

describe('SignupResolver', () => {
  let resolver: SignupResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        SignupModule
      ],
      providers: [
        SignupResolver
      ]
    }).compile();

    resolver = module.get<SignupResolver>(SignupResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
