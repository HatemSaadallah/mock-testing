import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { ConfigModule } from '@nestjs/config';
import configFile from '../config';
import { AppProvider } from './app.provider';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      load: [configFile],
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ...AppProvider],
})
export class AppModule {}
