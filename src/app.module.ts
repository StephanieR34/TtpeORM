import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { logger } from './middlewares/Logger.middleware'
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstMiddleware } from './middlewares/first.middleware';
import { TodoModule } from './todo/todo.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '172.17.0.2',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      entities: [],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer:MiddlewareConsumer): any {
    consumer.apply(FirstMiddleware).forRoutes( 'hello',
      {path: 'todo',  method: RequestMethod.GET},
      {path: 'todo*',  method: RequestMethod.DELETE})
      .apply(logger).forRoutes("")
      .apply(HelmetMiddleware).forRoutes("");
  }
}


