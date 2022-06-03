import { Module } from '@nestjs/common';
import { FlamingService } from './flaming.service';
import { FlamingController } from './flaming.controller';

@Module({
  imports: [],
  controllers: [FlamingController],
  providers: [FlamingService],
})
export class FlamingModule {}
