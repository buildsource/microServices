import { PartialType } from '@nestjs/swagger';
import { FlamingDto } from './flaming.dto';

export class UpdateFlamingDto extends PartialType(FlamingDto) {}
