const express = require('express');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const UserController = require('./controller/userController');

const app = express();
const port = 5022; //porta

//teste
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'vou conseguir',
    resave: false,
    saveUninitialized: true,
}));

app.get('/', (req, res) => {
    res.render('login');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.static('imagens'));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imagens/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const imagens = multer({ storage: storage });


app.get('/login', (req, res) => {
    res.render('login', { layout: 'layouts/layout' }); // Especifique o layout aqui
});


app.get('/cadastro', (req, res) => {
    res.render('cadastro', { layout: 'layouts/layout' }); // Especifique o layout aqui
});

app.post('/cadastro', UserController.cadastrar);

// Redireciona a rota principal para a tela inicial
app.get('/', (req, res) => {
    res.redirect('/home');
});

// Define a rota para a tela inicial
app.get('/home', (req, res) => {
    res.render('home');
});


app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});