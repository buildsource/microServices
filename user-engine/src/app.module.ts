import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqliteDatabaseModule } from './database/sqlite.database.module';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [SqliteDatabaseModule, TypeOrmModule.forFeature([UserEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
