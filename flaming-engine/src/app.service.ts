import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FlamingEntity } from './entities/flaming.entity';
import { FlamingDto } from './dto/flaming.dto';
import { UpdateFlamingDto } from './dto/update-flaming.dto';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(FlamingEntity)
    private repository: Repository<FlamingEntity>,
  ) {}

  async findByFilter(): Promise<FlamingDto[]> {
    return await this.repository.find({
      order: {
        id: 'DESC',
      },
    });
  }

  async create(flaming: FlamingDto): Promise<FlamingDto> {
    return await this.repository.save(flaming);
  }

  async findOne(flamingId: number): Promise<FlamingDto> {
    if (!flamingId) throw new Error();

    const response: FlamingDto = await this.repository.findOneBy({
      id: flamingId,
    });

    return response;
  }

  async update({
    id,
    name,
    abstract,
    author,
    year,
  }: Partial<UpdateFlamingDto>): Promise<void> {
    const flaming = await this.repository.findOneBy({ id });

    flaming.name = name ? name : flaming.name;
    flaming.abstract = abstract ? abstract : flaming.abstract;
    flaming.author = author ? author : flaming.author;
    flaming.year = year ? year : flaming.year;

    await this.repository.update(id, flaming);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}
