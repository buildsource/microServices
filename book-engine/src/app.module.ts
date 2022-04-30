import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqliteDatabaseModule } from './database/sqlite.database.module';
import { BookEntity } from './entities/book.entity';

@Module({
  imports: [SqliteDatabaseModule, TypeOrmModule.forFeature([BookEntity])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
