import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificationModule } from './notification/notification.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot(), NotificationModule, BookModule, AuthModule],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {}
