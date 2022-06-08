import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { FlamingDto } from './dto/flaming.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('find-filter-flaming')
  async index(): Promise<FlamingDto[]> {
    return this.appService.findByFilter();
  }

  @MessagePattern('create-flaming')
  async create(@Payload() { value }: any): Promise<FlamingDto> {
    this.logger.log(`Flaming: ${JSON.stringify(value)}`);

    return await this.appService.create(value);
  }

  @MessagePattern('find-flaming')
  async find(@Payload() data: any): Promise<FlamingDto | any> {
    return JSON.stringify(await this.appService.findOne(data.value.id));
  }

  @MessagePattern('update-flaming')
  async update(@Payload() data: any): Promise<void> {
    this.logger.log(`Flaming: ${JSON.stringify(data)}`);

    await this.appService.update(data.value);
  }

  @MessagePattern('delete-flaming')
  async remove(@Payload() data: any): Promise<void> {
    return this.appService.remove(data.value.id);
  }
}
