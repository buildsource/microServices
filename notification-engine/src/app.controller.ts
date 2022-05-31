import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('notification-email')
  async sendEmail(@Payload() { value }: any): Promise<void> {

    this.logger.log(`Email: ${JSON.stringify(value)}`);

    await this.appService.sendEmail(value);
  }

  @MessagePattern('notification-phone')
  async sendPhone(@Payload() { value }: any): Promise<void> {

    this.logger.log(`Phone: ${JSON.stringify(value)}`);

    this.appService.sendPhone(value);
  }
}
