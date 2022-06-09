import { FlamingEntity } from '../entities/flaming.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb+srv://flaming:flaming@cluster0.gsekc.gcp.mongodb.net/?retryWrites=true&w=majority',
      database: 'flaming',
      entities: [FlamingEntity],
      synchronize: true,
      ssl: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      logging: true,
    }),
  ],
})
export class MongoDatabaseModule {}
