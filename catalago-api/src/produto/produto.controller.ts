import { Controller, Get, Param, Post } from '@nestjs/common';
import { ProdutoService } from './produto.service';
const catalog = require('../shared/json/catalog.json');


@Controller('produto')
export class ProdutoController {
    constructor(
        private readonly produtoService: ProdutoService
    ) { }


    @Post()
    create() {
        return this.produtoService.create(JSON.parse(JSON.stringify(catalog)));
    }

    @Get('complete/:id')
    findAllDetails(@Param('id') id: string) {
        return this.produtoService.findOneWithCompletedData(id);
    }

    @Get('compact/:id')
    findCompactDetails(@Param('id') id: string) {
        return this.produtoService.findOneWithCompactData(id);
    }
}
