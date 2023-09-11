

const mysql = require('mysql2');


const database = mysql.createConnection({
    host: 'sql10.freemysqlhosting.net',
    user: 'sql10645365',
    password: 'rcMsfVbcY9',
    database: 'sql10645365',
    port : '3306'
});




database.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao banco de dados:', err);
    } else {
        console.log('Conexão com o banco de dados estabelecida com sucesso!');
    }
});


module.exports = database;
