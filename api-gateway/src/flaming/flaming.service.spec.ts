import { Test, TestingModule } from '@nestjs/testing';
import { FlamingService } from './flaming.service';

describe('UserService', () => {
  let service: FlamingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlamingService],
    }).compile();

    service = module.get<FlamingService>(FlamingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
