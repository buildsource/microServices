import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FlamingDto } from './dto/flaming.dto';
import { FlamingService } from './flaming.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateFlamingDto } from './dto/update-flaming.dto';
import { ObjectID } from 'typeorm';

@Controller('Flaming')
export class FlamingController {
  constructor(private FlamingService: FlamingService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() user: FlamingDto) {
    return this.FlamingService.create(user);
  }

  // @UseGuards(JwtAuthGuard)
  @Get()
  findByFilter(): Observable<FlamingDto[]> {
    return this.FlamingService.findByFilter();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':_id')
  findOne(@Param('_id') _id: ObjectID): Observable<FlamingDto> {
    return this.FlamingService.findOne(_id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':_id')
  update(
    @Param('_id') _id: ObjectID,
    @Body()
    data: Partial<UpdateFlamingDto>,
  ) {
    data._id = _id;

    return this.FlamingService.update(data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':_id')
  remove(@Param('_id') _id: ObjectID) {
    return this.FlamingService.remove(_id);
  }
}
