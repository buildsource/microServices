import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { BookEntity } from './entities/book.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('find-all-book')
  async index(): Promise<BookEntity[]> {
    return this.appService.findAll();
  }

  @MessagePattern('create-book')
  async create(@Payload() { value }: any): Promise<BookEntity> {
    this.logger.log(`Book: ${JSON.stringify(value)}`);

    return await this.appService.create(value);
  }

  @MessagePattern('find-book')
  async find(@Payload() data: any): Promise<BookEntity | any> {
    return JSON.stringify(await this.appService.findOne(Number(data.value.id)));
  }

  @MessagePattern('update-book')
  async update(@Payload() data: any): Promise<void> {
    this.logger.log(`Book: ${JSON.stringify(data)}`);

    await this.appService.update(data.value);
  }

  @MessagePattern('delete-book')
  async remove(@Payload() data: any): Promise<void> {
    return this.appService.remove(Number(data.value.id));
  }
}
