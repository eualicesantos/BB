const express = require("express");
const bcrypt = require("bcrypt");
const session = require("express-session");
const db = require("./database");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Configuração da sessão
app.use(session({
    secret: "biblioteca_secret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Rota de Registro
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    db.run("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", 
        [username, email, hashedPassword], 
        function(err) {
            if (err) {
                return res.status(400).json({ error: "Erro ao registrar usuário." });
            }
            res.redirect("/TelaLogin/login.html");
        }
    );
});

// Rota de Login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], async (err, user) => {
        if (err || !user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error: "Usuário ou senha inválidos." });
        }
        req.session.user = user;
        res.redirect("/TelaUsuario/usuario.html");
    });
});

// Rota para obter o nome do usuário logado
app.get("/user", (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: "Usuário não autenticado" });
    }
    res.json({ username: req.session.user.username });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});
