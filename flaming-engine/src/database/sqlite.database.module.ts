import { FlamingEntity } from '../entities/flaming.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'database.db',
      entities: [FlamingEntity],
      synchronize: true,
    }),
  ],
})
export class SqliteDatabaseModule {}
