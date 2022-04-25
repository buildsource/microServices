import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('find-all-user')
  async index(): Promise<UserEntity[]> {
    return this.appService.findAll();
  }

  @MessagePattern('create-user')
  async create(@Payload() data: any): Promise<UserEntity> {
    this.logger.log(`User: ${JSON.stringify(data)}`);

    return await this.appService.create(data.value);
  }

  @MessagePattern('find-user')
  async find(@Payload() data: any): Promise<UserEntity | any> {
    return JSON.stringify(await this.appService.findOne(Number(data.value.id)));
  }

  @MessagePattern('update-user')
  async update(@Payload() data: any): Promise<void> {
    this.logger.log(`User: ${JSON.stringify(data)}`);

    await this.appService.update(data.value);
  }

  @MessagePattern('delete-user')
  async remove(@Payload() data: any): Promise<void> {
    return this.appService.remove(Number(data.value.id));
  }

  @MessagePattern('activate-user')
  async activate(@Payload() data: any): Promise<void> {
    return this.appService.activate(Number(data.value.id));
  }

  @MessagePattern('inactivate-user')
  async inactivate(@Payload() data: any): Promise<void> {
    return this.appService.inactivate(Number(data.value.id));
  }
}
