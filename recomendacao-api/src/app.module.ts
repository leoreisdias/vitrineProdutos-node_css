import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    port: 5432,
    host: 'localhost',
    database: 'vitrine',
    username: 'postgres',
    password: 'teste',
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
