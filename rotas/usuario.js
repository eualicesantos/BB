const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors()); // Permite requisições de outros domínios

// Conectar ao MongoDB (substitua pela sua string de conexão)
mongoose.connect("mongodb://http://127.0.0.1:5500/TelaInicial/index.html", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Definir o modelo de usuário
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userCode: { type: String, required: true, unique: true }
});

const User = mongoose.model("User", UserSchema);

// 📌 Rota para verificar quantos usuários existem no banco
app.get("/api/checkUsers", async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        res.json({ totalUsers });
    } catch (error) {
        res.status(500).json({ error: "Erro ao contar usuários" });
    }
});

// 📌 Rota para registrar um novo usuário
app.post("/api/register", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verifica se já existem usuários cadastrados
        const totalUsers = await User.countDocuments();

        // Define o tipo de usuário (0 para admin, 1 para usuário comum)
        const userType = totalUsers === 0 ? "0" : "1";

        // Gera um código único para o usuário
        const userCode = userType + Math.floor(100000 + Math.random() * 900000);

        // Criar e salvar usuário no banco de dados
        const newUser = new User({ username, email, password, userCode });
        await newUser.save();

        res.json({ message: "Usuário registrado com sucesso!", userCode });
    } catch (error) {
        res.status(500).json({ error: "Erro ao registrar usuário" });
    }
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
