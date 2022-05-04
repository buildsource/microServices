import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppController.name);

  @MessagePattern('notification-email')
  async sendEmail(@Payload() data: any): Promise<void> {
    this.logger.log(`Email: ${JSON.stringify(data)}`);

    await this.appService.sendEmail(
      Number(data.value.id),
      data.value.email,
      data.value.name,
    );
  }

  @MessagePattern('notification-phone')
  async sendPhone(@Payload() data: any): Promise<void> {
    this.logger.log(`Phone: ${JSON.stringify(data)}`);

    this.appService.sendPhone(
      Number(data.value.id),
      data.value.phone,
      data.value.name,
    );
  }
}
