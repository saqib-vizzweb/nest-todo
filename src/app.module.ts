import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnApplicationShutdown,
} from '@nestjs/common';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    TodosModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule implements NestModule, OnApplicationShutdown {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('todos');
  }

  onApplicationShutdown(signal: string) {
    console.log(`AppModule shutting down due to: ${signal}`);
  }
}
