import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';
import { NotificationModule } from './notification/notification.module';

@Module({
  imports: [UsersModule, NotificationModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
