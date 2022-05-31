import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { EmailDto } from './dto/email.dto';
import { PhoneDto } from './dto/phone.dto';

@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('email')
  sendEmail(@Body() data: EmailDto) {
    return this.notificationService.sendEmail(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('phone')
  sendPhone(@Body() data: PhoneDto) {
    return this.notificationService.sendPhone(data);
  }
}
