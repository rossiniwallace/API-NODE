const mysql = require('mysql');

const conexao = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'bcd127',
    database: 'db_nodejs'
});

module.exports = conexao;