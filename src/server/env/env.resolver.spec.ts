import { Test, TestingModule } from '@nestjs/testing';
import { EnvResolver } from './env.resolver';

describe('EnvResolver', () => {
  let resolver: EnvResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EnvResolver],
    }).compile();

    resolver = module.get<EnvResolver>(EnvResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
