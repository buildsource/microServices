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
  constructor(private FlamingService: FlamingService) {}

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
  @Get(':id')
  findOne(@Param('id') id: ObjectID): Observable<FlamingDto> {
    return this.FlamingService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: ObjectID,
    @Body()
    { name, coordinates, val, year, files }: Partial<UpdateFlamingDto>,
  ) {
    return this.FlamingService.update({
      id,
      name,
      coordinates,
      val,
      year,
      files,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: ObjectID) {
    return this.FlamingService.remove(id);
  }
}
