import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { NotificationModule } from './notification/notification.module';
import { BookModule } from './book/book.module';

@Module({
  imports: [UsersModule, NotificationModule, BookModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
