const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

// Rota de registro (GET)
router.get('/register', UserController.showRegisterForm);

// Rota de registro (POST)
router.post('/register', UserController.registerUser);

// Rota de login (GET)
router.get('/login', UserController.showLoginForm);

// Rota de login (POST)
router.post('/login', UserController.loginUser);

// Outras rotas relacionadas a usuários

module.exports = router;
