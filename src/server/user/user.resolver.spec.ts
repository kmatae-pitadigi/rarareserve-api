import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { AppModule } from '../app.module';
import { UserModule } from './user.module';

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        UserModule
      ],
      providers: [
        UserResolver
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
