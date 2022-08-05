import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AuthDto } from './dto/auth.dto';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async login({ username, password }: AuthDto): Promise<TokenDto> {
    return await this.http

      .post(
        `${process.env.KEY_CLOAK_URI}/auth/realms/microservices/protocol/openid-connect/token`,
        new URLSearchParams({
          client_id: process.env.KEY_CLOAK_CLIENT_ID,
          client_secret: process.env.KEY_CLOAK_CLIENT_SECRET,
          grant_type: process.env.KEY_CLOAK_GRANT_TYPE,
          username,
          password,
        }),
      )
      .toPromise()
      .then((res) => res.data)
      .catch((err) => err);
  }
}
