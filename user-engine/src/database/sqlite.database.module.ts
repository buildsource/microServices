import { UserEntity } from '../entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [UserEntity],
      synchronize: true,
    }),
  ],
})
export class SqliteDatabaseModule {}
