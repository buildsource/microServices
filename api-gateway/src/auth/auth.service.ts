import { HttpService } from '@nestjs/axios';
import { User } from './interfaces/user.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(private readonly http: HttpService) {}

  async login({ username, password }: User): Promise<any> {
    return this.http
      .post(
        process.env.KEY_CLOAK_URI,
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
