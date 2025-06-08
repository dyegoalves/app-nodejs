# Aplicação Node.js com Docker

Este projeto demonstra uma aplicação Node.js com MySQL e Nginx usando Docker Compose, com configuração do dockerize para esperar o banco de dados ficar disponível.

## Configuração do Docker para esperar o banco de dados

O arquivo `docker-compose.yml` contém:

```yaml
  services 

   db  : Container com serviço de banco de dados

   web : Container com serviço do nginx como proxy reverso

   app : Container com serviço do app em node.js com dockerize para esperar 60s o banco de dados ficar online e pronto para uso, onde é criado a conexão com o banco de dados, é criada a tabela de users, onde tambem é inseridos 10 users de testes, e é iniciado o servidor na porta 3000 com express.

```

Esta configuração faz com que:
1. O app Node.js só inicia quando a conection com o banco de dados estiver saudável

## Como executar

```bash
docker-compose up -d --build
```

## Logs de exemplo
Quando tudo funciona corretamente, você verá:

```
app  | Connected to tcp://db:3306 
db   | [Note] Got an error reading communication packets 
app  | Servidor rodando na porta 3000 
app  | Conexão com o banco de dados estabelecida com sucesso!
```

## Acesso à aplicação
A aplicação estará disponível em `http://localhost` com Nginx como proxy reverso.