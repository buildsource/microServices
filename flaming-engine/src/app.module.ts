import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqliteDatabaseModule } from './database/sqlite.database.module';
import { FlamingEntity } from './entities/flaming.entity';

@Module({
  imports: [SqliteDatabaseModule, TypeOrmModule.forFeature([FlamingEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
