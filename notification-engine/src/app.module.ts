import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SqliteDatabaseModule } from './database/sqlite.database.module';
import { NotificationEntity } from './entities/notification.entity';
import { SendGridModule } from '@ntegral/nestjs-sendgrid';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SqliteDatabaseModule,
    TypeOrmModule.forFeature([NotificationEntity]),
    SendGridModule.forRoot({
      apiKey: process.env.SENDGRID_SECRET_KEY,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
