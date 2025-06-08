//instalar o express para js
const express = require('express');

//instalar o mysql para js
const mysql = require('mysql');
const app = express();

//criar uma conexão com o banco de dados
const connection = mysql.createConnection({
    host: 'db',
    user: 'root',
    password: '142536',
    database: 'nodejs'
})

//conectar ao banco de dados
connection.connect((err) => {
    if (err) {
        console.error(`Erro ao conectar ao banco de dados: ${err.stack}`);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
})

//criar uma tabela no banco de dados caso nao exista
connection.query('CREATE TABLE IF NOT EXISTS users (id int auto_increment primary key, name varchar(255))', (err) => {
    if (err) {
        console.error(`Erro ao criar a tabela: ${err.stack}`);
        return;
    }
})

// dados para cadastrar no banco de dados
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

//inserir os nomes na tabela
for (let i = 0; i < namesforcadastro.length; i++) {
    connection.query(`INSERT INTO users (name) VALUES ("${namesforcadastro[i]}")`, (err) => {
        if (err) {
            console.error(`Erro ao inserir o usuário: ${err.stack}`);
            return;
        }
    })
}

app.get('/', (req, res) => {
    connection.query('SELECT * FROM users', (err, results) => {
        if (err) {
            console.error(`Erro ao executar a consulta: ${err.stack}`);
            res.status(500).send('Erro ao executar a consulta');
            return;
        }
        const mensagemdata = {
            mensagem: `Essa é uma lista de usuario, criada com sucesso!, e a data atual é: ${new Date().toLocaleDateString('pt-BR')} ${new Date().toLocaleTimeString('pt-BR')}`,
            results
        }
        res.send(mensagemdata);
    })
})

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
})