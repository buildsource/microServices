import { HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { Token } from '../src/auth/interfaces/token.interface';

const uri = `http://localhost:3000`;

const login = async () => {
  const responseAuth: request.Response = await request(uri).post(`/auth/login`)
      .send(
        {
          "username": "claudinei",
          "password": "123456"
        }
      );

      const response: Token = responseAuth.body;

      return response;
}

describe('NotificationController (e2e)', () => {
  describe('/notification/email (POST)', () => {
    it('it should trigger a notification to the email', async () => {
      await request(uri).post(`/notification/email`)
      .set({ Authorization: await login() })
      .send(
        {
          "name": "claudinei",
          "email": "claudinei-de-lima@hotmail.com"
        }
      );
      
      expect(HttpStatus.CREATED);
    });
  });

  describe('/notification/phone (POST)', () => {
    it('it should trigger a notification to the phone', async () => {
      await request(uri).post(`/notification/phone`)
      .set({ Authorization: await login() })
      .send(
        {
          "name": "Claudinei",
          "phone": "5555991657275"
        }
      );
      
      expect(HttpStatus.CREATED);
    });
  });
});