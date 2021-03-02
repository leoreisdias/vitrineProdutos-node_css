import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoEntity } from './produto/entities/produto.entity';
import { ProdutoController } from './produto/produto.controller';
import { ProdutoService } from './produto/produto.service';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'teste',
    database: 'vitrine',
    autoLoadEntities: true,
    synchronize: true
  }),
  TypeOrmModule.forFeature([ProdutoEntity])
  ],
  controllers: [AppController, ProdutoController],
  providers: [AppService, ProdutoService],
})
export class AppModule { }
