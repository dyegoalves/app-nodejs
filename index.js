// Instalar o express para js
const express = require('express');

// Instalar o mysql para js
const mysql = require('mysql');
const app = express();

// Criar uma conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: '142536',
    database: 'nodejs'
})

// Conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error(`Erro ao conectar ao banco de dados: ${err.stack}`);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
})

// Delete tabela users
connection.query('DROP TABLE IF EXISTS users', (err) => {
    if (err) {
        console.error(`Erro ao deletar a tabela: ${err.stack}`);
        return;
    }
})

// Criar uma tabela no banco de dados caso nao exista
connection.query('CREATE TABLE IF NOT EXISTS users (id int auto_increment primary key, name varchar(255))', (err) => {
    if (err) {
        console.error(`Erro ao criar a tabela: ${err.stack}`);
        return;
    }
})

// Dados para cadastrar no banco de dados
const namesforcadastro = [
    'Dyego Alves',
    'João Silva',
    'Maria da Silva',
    'Pedro Santos',
    'Ana Oliveira',
    'Lucas Pereira',
    'Carla Souza',
    'Rafael Santos',
    'Fernanda Lima',
    'Marcos Costa'
]

//Inseri a lista de namesforcadastro nomes na tabela users
for (let i = 0; i < namesforcadastro.length; i++) {
    connection.query(`INSERT INTO users (name) VALUES ("${namesforcadastro[i]}")`, (err) => {
        if (err) {
            console.error(`Erro ao inserir o usuário: ${err.stack}`);
            return;
        }
    })
}

// View e lista de dados
app.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error(`Erro ao executar a consulta: ${err.stack}`);
            res.status(500).send('Erro ao executar a consulta');
            return;
        }

        const dataAtual = new Date();
        const mensagem = `<h1>Full Cycle Rocks!!</h1>
      <p>Essa é uma lista de usuários do Banco de Dados MySQL, criada com sucesso!</p>
      <p>Data atual: ${dataAtual.toLocaleDateString('pt-BR')} ${dataAtual.toLocaleTimeString('pt-BR')}</p>
      <ul>
        ${results.map(user => `<li>${user.id} - ${user.name}</li>`).join('')}
      </ul>`;

        res.send(`<!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8" />
        <title>Usuários</title>
      </head>
      <body>
        ${mensagem}
      </body>
      </html>`);
    });
});


app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})