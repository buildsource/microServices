import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotificationModule } from './notification/notification.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HttpLoggerMiddleware } from 'utils/loggerMiddleware';
import { FlamingModule } from './flaming/flaming.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    NotificationModule,
    BookModule,
    AuthModule,
    FlamingModule,
  ],
  controllers: [AppController],
  providers: [],
  exports: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
