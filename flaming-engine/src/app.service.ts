import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { FlamingEntity } from './entities/flaming.entity';
import { FlamingDto } from './dto/flaming.dto';
import { UpdateFlamingDto } from './dto/update-flaming.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(FlamingEntity)
    private repository: Repository<FlamingEntity>,
  ) { }

  async findByFilter(): Promise<FlamingDto[]> {
    return await this.repository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async create(flaming: FlamingDto): Promise<FlamingDto> {
    try {
      return await this.repository.save(flaming);
    } catch (error) {
      return error;
    }
  }

  async findOne(flamingId: ObjectID): Promise<FlamingDto> {
    if (!flamingId) throw new Error();

    const response: FlamingDto = await this.repository.findOneBy({
      id: flamingId,
    });

    return response;
  }

  async update({
    id,
    name,
    coordinates,
    val,
    year,
    files,
  }: Partial<UpdateFlamingDto>): Promise<void> {
    const flaming = await this.repository.findOneBy({ id });

    flaming.name = name ? name : flaming.name;
    flaming.coordinates = coordinates ? coordinates : flaming.coordinates;
    flaming.val = val ? val : flaming.val;
    flaming.year = year ? year : flaming.year;
    flaming.files = files ? files : flaming.files;

    await this.repository.update(id, flaming);
  }

  async remove(id: ObjectID): Promise<void> {
    await this.repository.delete({ id });
  }
}
