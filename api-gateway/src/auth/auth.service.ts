import { User } from './../users/interfaces/user.interface';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  validateUser(email: string, password: string): Observable<User> {
    return this.usersService.validateUser(email, password);
  }

  login({ email, id }: User): any {
    const payload = { email, sub: id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
