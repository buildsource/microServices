import { Controller, Get, Request, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Request() req) {
    return this.authService.login(req);
  }
}