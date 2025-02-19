// Importando pacotes
const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

// Configurando o MySQL
const db = mysql.createConnection({
  host: "localhost",  // Ou o endereço do seu servidor MySQL
  user: "root",       // Seu usuário do MySQL
  password: "",       // Sua senha do MySQL
  database: "biblioteca",  // Nome do banco de dados
});

db.connect((err) => {
  if (err) throw err;
  console.log("Conectado ao banco de dados MySQL");
});

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para verificar o total de usuários
app.get("/api/checkUsers", (req, res) => {
  const query = "SELECT COUNT(*) AS totalUsers FROM usuarios";
  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao acessar o banco de dados" });
    }
    res.json(result[0]);
  });
});

// Rota para registrar um novo usuário
app.post("/api/register", (req, res) => {
  const { username, email, password, userCode } = req.body;
  const query = "INSERT INTO usuarios (username, email, password, codigo) VALUES (?, ?, ?, ?)";
  db.query(query, [username, email, password, userCode], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao registrar usuário" });
    }
    res.status(200).json({ message: "Usuário registrado com sucesso" });
  });
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
