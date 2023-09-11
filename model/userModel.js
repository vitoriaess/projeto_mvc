const database = require('./database');
const md5 = require('md5');

const UserModel = {
    async create(nome, email, senha) {
        const senhaCriptografada = md5(senha);
        const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
    
        try {
            const result = await database.query(sql, [nome, email, senhaCriptografada]);
            console.log('Usuário criado com sucesso:', result);
            return result;
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            throw error;
        }
    },

    async autenticar(email, senha) {
        if (!email || !senha) {
            console.error('Email ou senha não fornecidos');
            return null;
        }

        const senhaCriptografada = md5(senha);
        const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    
        try {
            const results = await database.query(sql, [email, senhaCriptografada]);
            console.log('Resultados da autenticação:', results);

            // Verifique se há resultados e retorne o primeiro resultado, se houver
            if (results.length > 0) {
                console.log('Usuário autenticado com sucesso:', results[0]);
                return results[0];
            } else {
                // Usuário não encontrado
                console.log('Usuário não encontrado');
                return null;
            }
        } catch (error) {
            console.error('Erro na autenticação:', error);
            throw error;
        }
    }
};

module.exports = UserModel;
