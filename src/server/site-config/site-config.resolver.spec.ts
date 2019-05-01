import { Test, TestingModule } from '@nestjs/testing';
import { SiteConfigResolver } from './site-config.resolver';

describe('SiteConfigResolver', () => {
  let resolver: SiteConfigResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SiteConfigResolver],
    }).compile();

    resolver = module.get<SiteConfigResolver>(SiteConfigResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
