crequire('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Seu usuário do MySQL
    password: '', // Sua senha do MySQL
    database: 'biblioteca'
});

// Conectar ao banco
db.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    } else {
        console.log('Conectado ao MySQL');
    }
});

// Rota para autenticação
app.post('/login', (req, res) => {
    const { email, senha } = req.body;

    const sql = 'SELECT * FROM usuarios WHERE email = ? AND senha = ?';
    db.query(sql, [email, senha], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro no servidor' });
        }

        if (result.length > 0) {
            res.json({ success: true, codigo: result[0].codigo });
        } else {
            res.json({ success: false, message: 'Usuário ou senha incorretos' });
        }
    });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
