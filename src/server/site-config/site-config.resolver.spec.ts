import { Test, TestingModule } from '@nestjs/testing';
import { SiteConfigResolver } from './site-config.resolver';
import { AppModule } from '../app.module';
import { SiteConfigModule } from './site-config.module';

describe('SiteConfigResolver', () => {
  let resolver: SiteConfigResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        SiteConfigModule
      ],
      providers: [
        SiteConfigResolver
      ]
    }).compile();

    resolver = module.get<SiteConfigResolver>(SiteConfigResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
