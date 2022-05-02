import { User } from './../users/interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    return await this.usersService.validateUser(email, password);
  }

  async login({ email, id }: User) {
    const payload = { email, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
