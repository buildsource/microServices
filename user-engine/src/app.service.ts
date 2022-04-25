import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.repository.find({
      order: {
        id: 'DESC',
      },
      // where: { status: 'ACTIVATE' },
    });
  }

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.repository.save(user);
  }

  async findOne(userId: number): Promise<UserEntity> {
    if (!userId) throw new Error();

    const response: UserEntity = await this.repository.findOneBy({
      id: userId,
    });

    return response;
  }

  async update({
    id,
    name,
    email,
    phone,
    password,
  }: UserEntity): Promise<void> {
    const user = await this.repository.findOneBy({ id });

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.phone = phone ? phone : user.phone;
    user.password = password ? password : user.password;

    await this.repository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete({ id });
  }

  async activate(id: number): Promise<void> {
    await this.repository.update(id, { status: 'ACTIVATE' });
  }

  async inactivate(id: number): Promise<void> {
    await this.repository.update(id, { status: 'INACTIVATE' });
  }
}
