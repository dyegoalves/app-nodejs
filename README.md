# Aplicação Node.js com Docker

Este projeto demonstra uma aplicação Node.js com MySQL e Nginx usando Docker Compose, com configuração do dockerize para esperar o banco de dados ficar disponível.

## Configuração do Docker para esperar o banco de dados

O arquivo `docker-compose.yml` contém os services: 

   - `db`  : Container com serviço de banco de dados

   - `web` : Container com serviço do nginx como proxy reverso

   - `app` : Container com serviço do app em node.js com dockerize para esperar 60s o banco de dados ficar online e pronto para uso, onde é criado a conexão com o banco de dados, é `deletada/criada` a tabela de users caso exista, onde tambem é inseridos 10 users de testes, e é iniciado o servidor na porta 3000 com express.


Esta configuração faz com que:
1. O app Node.js só inicia quando a conection com o banco de dados estiver saudável e pronto para uso, o teste e feito com o dockerize.

## Como executar

```bash
docker-compose up -d --build
```
## Logs de aplicação e DEBUG

#### Comando para ver os logs de execução do web, app e db:
``` bash
 docker-compose logs -f
```

#### Quando tudo funciona corretamente, você verá:

``` bash
app  | Connected to tcp://db:3306 
db   | [Note] Got an error reading communication packets 
app  | Servidor rodando na porta 3000 
app  | Conexão com o banco de dados estabelecida com sucesso!
``` 

### Acesso à aplicação
- A aplicação estará disponível em `http://localhost:8080` com Nginx como proxy reverso, com consta no enunciado.

### Para atualizar a aplicação dentro do container:

- 1 - Foi mapeado um volume o codigo fonte de app para dentro do container `/app`
- 2 - Foi instalado a lib `Nodemon` no npm e configurado no dockerfile  CMD `npm run dev`, para atualização em tempo real, `no caso com F5 no navegador.`

``` json 
"scripts": {
  "start": "node index.js",
  "dev": "nodemon --legacy-watch index.js", // indicado windows / wsl / bash
 ...
}
  
```

### Banco de dados e Salvamento de dados em volume

 - O banco de dados esta sendo salvo atráves de volume montado no $HOME no caso LINUX, consultar os dados no hots em: `~/volumes/mysql-data/`

``` yaml
services:
  db:
    image: mysql:5.7
  ...
  volumes: 
    - ~/volumes/mysql-data:/var/lib/mysql
```