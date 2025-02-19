// routes/usuarioRoutes.js
const express = require('express');
const router = express.Router();
const { Usuario } = require('../models'); // O modelo de usuário já foi definido no usuario.js

// Rota para carregar o painel do administrador
router.get('/admin', async (req, res) => {
    // Verifique se o usuário tem permissões de administrador
    if (req.user && req.user.tipo_usuario === 'Administrador') {
        res.render('usuario', { username: req.user.nome });
    } else {
        res.redirect('/login');
    }
});

// Rota para carregar o painel do usuário padrão
router.get('/usuario', async (req, res) => {
    // Verifique se o usuário tem permissões de aluno ou outro tipo
    if (req.user && req.user.tipo_usuario !== 'Administrador') {
        res.render('usuarioPadrao', { username: req.user.nome });
    } else {
        res.redirect('/login');
    }
});

// Rota para o login
router.get('/login', (req, res) => {
    res.render('login');
});

// Rota para buscar o nome de usuário, simulando uma requisição de dados do servidor
router.get('/user', (req, res) => {
    // Aqui, você vai pegar as informações do usuário logado, normalmente vindo de um banco de dados ou sessão
    if (req.user) {
        res.json({ username: req.user.nome });
    } else {
        res.status(401).json({ error: 'Usuário não autenticado' });
    }
});

module.exports = router;
