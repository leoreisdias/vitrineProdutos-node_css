<a href="https://www.notion.so/Desafio-Linx-Documenta-o-e172e77bd06a40c4a3b0ba03f42fa2e0">Link da Documentação no Notion</a>

# Desafio Linx - Documentação

# Catalogo API

O catálogo de produtos foi feito em Node.js com a ajuda do Nest.js para modularizações e injeções de depêndencias facilitadas pelo *framework.*

O primeiro desafio de armazenar os dados no banco de dados do **catalog.json** foi feito a partir da leitura do mesmo e usando do TypeORM para armazenar no então usado **Postgres** em um **Container Docker** via **Docker-Compose**.

**Configuração do docker-compose.yml para replicação**

```tsx
version: "3"

services:
  db:
    image: postgres
    restart: always
    ports:
      - "5432:5432"
    environment:
      POSTGRES_PASSWORD: teste
```

A Database foi nomeada como **vitrine** com as seguintes configurações do TypeORM no ***module*** principal da aplicação:

```tsx
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
```

A utilização das Entities abstrairam a tabela de produto do banco e pensando no desenvolvimento, a opção **synchronize** foi habilitada para agilizar o processo (mas em produção eu desativaria).

### **Os Inserts em massa**

Primeiramente, coloquei um array em volta do arquivo **catalog.json** para facilitar a leitura do arquivo. E usando do TypeORM fiz a criação das Instâncias e salvei os dados no banco.

Para evitar sobrecargas no banco, utilizei da opção **chunck** dos Repository TypeORM, que faz inserções particionadas.

### Rotas

As rotas estão definidas na **controller** de produtos, assim como seus parâmetros e definição de *query*. E suas Regras de Negócio estão declaras na respectiva **Service**.

## Definição de Rotas

- **[POST] /produto**

    Leitura e chamada da função *create* na Service para inserções no Banco.

    **Objetivo:** Inserção de Produtos na tabela produtos

    **Parâmetros:** (Nenhum)

    **Código:**

    ```tsx
    @Post()
        create() {
            return this.produtoService.create(JSON.parse(JSON.stringify(catalog)));
        }
    ```

    **Saída:** (Objeto)

- **[GET] /produto/complete/:id**

    De acordo com o parâmetro faz a busca de detalhes de um produto

    **Objetivo:** Busca completa de dados de um produto

    **Parâmetros:** (string)

    **Código:**

    ```tsx
    @Post()
        create() {
            return this.produtoService.create(JSON.parse(JSON.stringify(catalog)));
        }
    ```

    **Saída:** (Objeto)

- **[GET] /produto/compact/:id**

    De acordo com o parâmetro faz a busca de algumas informações de um produto

    **Objetivo:** Busca compacta de dados de um produto

    **Parâmetros:** (string)

    **Código:**

    ```tsx
    @Get('compact/:id')
        findCompactDetails(@Param('id') id: string) {
            return this.produtoService.findOneWithCompactData(id);
        }
    ```

    **Saída:** (Objeto)

---

# Recomendações API

A API de recomendações foi feita com a mesma tecnologia anteriormente mencionada. Com utilização de apenas um ***Endpoint*** e possibilita de um **Query Param** definindo o máximo de produtos retornados de cada categoria de recomendações (*most popular, price reduction*).

### Conexão no microserviço de recomendações

Foi usado do **axios** para buscar os JSON de recomendações e a Regra de Negócio novamente implementada na **Service** com tentativa de separar de deixar funções com responsabilidades únicas, como forma de estudo e prática do **Clean Code.**

## Definição de Rotas

- **[GET] /recommend**

    Busca as recomendações de produtos disponíveis. **Pode receber um Query Param
    `/recommend?maxProducts`**

    **Objetivo:** Busca de recomendações limitando pelo **Query maxProducts** se existente e filtrando para exibir somente produtos disponíveis das recomendações

    **Código:**

    ```tsx
    @Get('')
      getMostPopular(@Query() query) {
        const { maxProducts } = query;
        return this.appService.getRecommendation(maxProducts);
      }
    ```

    **Saída:** (Objeto)

# Ideias para melhor performance

Tráfego de rede entre microserviços em geral é algo custoso, e que prejudica a
performance dos serviços. Como poderíamos resolver esse problema na api de
recomendações? Se possível, implemente essa solução;

Para essa questão, gosto de usar o React com Next.js em aplicações Frontend, com eles eu poderia aplicar os conceitos de **SSR** e **SSG.** Que reduziriam e otimizariam as buscas em um banco de dados.
