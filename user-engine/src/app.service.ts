import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { IUser } from './interfaces/user.interface';

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

  async findOne(userId: number): Promise<any> {
    if (!userId) throw new Error();

    const response = await this.repository.findOneBy({ id: userId });

    return JSON.stringify(response);
  }

  async update(userData: UserEntity): Promise<void> {
    const { id, name, email, phone, password } = userData;
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
