import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Email } from './interfaces/email.interface';
import { Phone } from './interfaces/phone.interface';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('email')
  sendEmail(@Body() data: Email) {
    return this.notificationService.sendEmail(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('phone')
  sendPhone(@Body() data: Phone) {
    return this.notificationService.sendPhone(data);
  }
}
