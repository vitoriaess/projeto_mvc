const UserModel = require('../model/userModel');
const md5 = require('md5');

const UserController = {
    cadastro: async (req, res) => {
        res.render('cadastro', { layout: 'layouts/layout' });
    },

    cadastrar: async (req, res) => {
        const { nomeuser, InputEmail, InputPassword } = req.body;

        try {
            // Verifica se o usuário já existe no banco de dados
            const user = await UserModel.autenticar(InputEmail, InputPassword);

            if (user) {
                return res.render('cadastro', { error: 'Usuário já existe' });
            }

            // Se o usuário não existe, cria um novo registro no banco de dados
            const hashedPassword = md5(InputPassword); // Hash da senha (não recomendado para produção)
            const result = await UserModel.create(nomeuser, InputEmail, hashedPassword);

            // Registro bem-sucedido
            return res.render('login', { success: 'Registro bem-sucedido, faça o login.' });
        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro interno do servidor');
        }
    },

    login: async (req, res) => {
        res.render('login', { layout: 'layouts/layout' });
    },

    loginfeito: async (req, res) => {
        const { InputEmail, InputPassword } = req.body;

        try {
            // Verifica se o usuário existe no banco de dados e se a senha está correta
            const user = await UserModel.autenticar(InputEmail, InputPassword);

            if (!user) {
                return res.render('login', { error: 'Credenciais inválidas' });
            }

            // Login bem-sucedido; você pode criar uma sessão aqui
            req.session.userId = user.id; // Armazena o ID do usuário na sessão

            // Redireciona para a página inicial após o login bem-sucedido
            return res.redirect('/home');
        } catch (error) {
            console.error(error);
            return res.status(500).send('Erro interno do servidor');
        }
    }
    // Outros métodos de controlador
};

module.exports = UserController;
