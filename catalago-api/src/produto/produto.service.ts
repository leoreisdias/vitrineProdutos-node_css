import { HttpException, HttpStatus, Injectable, NotFoundException, Res } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProdutosDto } from './dto/create-produtos.dto';
import { ProdutoEntity } from './entities/produto.entity';


@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(ProdutoEntity)
        private readonly produtoRepository: Repository<ProdutoEntity>
    ) { }

    async create(createProdutosDto: CreateProdutosDto) {
        const produtos = this.produtoRepository.create(createProdutosDto);

        return this.produtoRepository.save(produtos, { chunk: 10 })
    }

    async find() {
        const produtos = await this.produtoRepository.find();

        return produtos;
    }

    async findOneWithCompletedData(id: string) {
        const produto = await this.produtoRepository.findOne(id);

        if (!produto) {
            throw new HttpException('Não foi encontrado', HttpStatus.NOT_FOUND);
        }

        return produto;
    }

    async findOneWithCompactData(id: string) {
        const produto = await this.produtoRepository.findOne(id, {
            select: ['name', 'price', 'status', 'categories']
        })

        if (!produto) {
            throw new NotFoundException('Não foi encontrado!'); //Outra modo de usar HttpException
        }

        return produto;
    }

}
