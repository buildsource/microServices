import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongoDatabaseModule } from './database/mongo.database.module';
import { FlamingEntity } from './entities/flaming.entity';

@Module({
  imports: [MongoDatabaseModule, TypeOrmModule.forFeature([FlamingEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
