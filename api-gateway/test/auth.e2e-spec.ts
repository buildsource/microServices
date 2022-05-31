import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { TokenDto } from '../src/auth/dto/token.dto';

describe('AuthController (e2e)', () => {
  const uri = `http://localhost:3000`;

  describe('/auth/login (POST)', () => {
    it('it should return the token', async () => {
      const responseAuth: request.Response = await request(uri)
        .post(`/auth/login`)
        .send({
          username: 'claudinei',
          password: '123456',
        });

      const { access_token, refresh_token, scope }: TokenDto =
        responseAuth.body;

      expect(typeof access_token).toBe('string');
      expect(typeof refresh_token).toBe('string');
      expect(typeof scope).toBe('string');
      expect(HttpStatus.CREATED);
    });
  });
});
