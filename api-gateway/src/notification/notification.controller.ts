import { Controller, Post, Body } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EmailDto } from './dto/email.dto';
import { PhoneDto } from './dto/phone.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post('email')
  sendEmail(@Body() data: EmailDto) {
    return this.notificationService.sendEmail(data);
  }

  @Post('phone')
  sendPhone(@Body() data: PhoneDto) {
    return this.notificationService.sendPhone(data);
  }
}
