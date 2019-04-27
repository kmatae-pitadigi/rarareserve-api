import { Test, TestingModule } from '@nestjs/testing';
import { SigninResolver } from './signin.resolver';

describe('SigninResolver', () => {
  let resolver: SigninResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SigninResolver],
    }).compile();

    resolver = module.get<SigninResolver>(SigninResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
