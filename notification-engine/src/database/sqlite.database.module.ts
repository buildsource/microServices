import { NotificationEntity } from '../entities/notification.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [NotificationEntity],
      synchronize: true,
    }),
  ],
})
export class SqliteDatabaseModule {}
