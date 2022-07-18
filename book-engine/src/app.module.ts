import { BookAssessmentsEntity } from './entities/bookAssessments.entity';
import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SqliteDatabaseModule } from './database/sqlite.database.module';
import { BookEntity } from './entities/book.entity';
import { ConfigHttpRedisModule } from './config/config-service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SqliteDatabaseModule,
    TypeOrmModule.forFeature([BookEntity, BookAssessmentsEntity]),
    CacheModule.registerAsync(ConfigHttpRedisModule),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
