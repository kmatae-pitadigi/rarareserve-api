import { Test, TestingModule } from '@nestjs/testing';
import { SiteConfigService } from './site-config.service';
import { AppModule } from '../app.module';
import { SiteConfigModule } from '../site-config/site-config.module';

describe('SiteInfoService', () => {
  let service: SiteConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        SiteConfigModule
      ],
      providers: [
        SiteConfigService
      ],
    }).compile();

    service = module.get<SiteConfigService>(SiteConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
