## API de Gestão de Vendas

## Funcionalidades

Cadastro de:
- Produtos
- Clientes
- Pedidos de Compra
- Gestão de Usuarios:
    - Autenticação via token JWT
    - Recuperação de senha por email
    - atualização de perfil
    - atualização de avatar


Caso os containers ja existan na maquina basta rodar os comando abaixo
```bash
$ docker start postgres redis redis-client
```
e depois lenvantar o servidor com o node
```bash
$ yarn dev
```

se não existem basta seguir os passos abaixo

subindo container com banco de dados postgres
```bash
$ docker run --name postgres -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
```
container do servidor redis
```bash
$ docker run --name redis -p 6379:6379 -d -t redis:alpine
```

container cliente redis usando o RedisInsight  
```bash
$ docker run --name redis-client -v redisinsight:/db -p 8001:8001 -d -t redislabs/redisinsight:latest
```

depois de rodar esse comando o cliente redis fica disponivel nesta rota  
[http://localhost:8001](http://localhost:8001/)

Generating a UUID in Postgres for Insert statement
```bash
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

criando uma migration
```bash
$ yarn typeorm migration:create -n CreateProducts
```

Rodando a migration
```bash
$ yarn typeorm migration:run
```
