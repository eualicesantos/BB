const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).send("Todos os campos são obrigatórios!");
    }

    // Simulação de salvamento no banco (substitua por lógica real)
    console.log("Usuário registrado:", username);

    // Redireciona para o painel de usuário
    res.redirect("../Viws/usuario.html");
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
