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
        _id: 'DESC',
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

  async findOne(_id: ObjectID): Promise<FlamingDto> {
    if (!_id) throw new Error();

    const response: FlamingDto = await this.repository.findOneById(_id);

    return response;
  }

  async update(data: Partial<UpdateFlamingDto>): Promise<void> {
    const flaming = await this.repository.findOneById(data._id);

    const flamingUpdate: Partial<UpdateFlamingDto> = { ...flaming, ...data };

    delete flamingUpdate._id;

    await this.repository.update(data._id, flamingUpdate);
  }

  async remove(_id: ObjectID): Promise<void> {
    await this.repository.delete({ _id });
  }
}
