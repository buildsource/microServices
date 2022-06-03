import { Test, TestingModule } from '@nestjs/testing';
import { FlamingController } from './flaming.controller';
import { FlamingService } from './flaming.service';

describe('FlamingController', () => {
  let controller: FlamingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlamingController],
      providers: [FlamingService],
    }).compile();

    controller = module.get<FlamingController>(FlamingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
