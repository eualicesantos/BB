const users = [
    { username: "admin", password: "admin123", role: "admin" },
    { username: "user", password: "user123", role: "comum" }
];

function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        localStorage.setItem("userRole", user.role); // Armazena o tipo de usuário
        alert("Login bem-sucedido!");

        // Verifica se é administrador e exibe opções
        if (user.role === "admin") {
            document.getElementById("adminOptions").style.display = "block";
        } else {
            document.getElementById("adminOptions").style.display = "none";
        }
    } else {
        alert("Usuário ou senha incorretos!");
    }
}

function addUser() {
    alert("Função para adicionar usuário.");
}

function updateUser() {
    alert("Função para atualizar usuário.");
}

function deleteUser() {
    alert("Função para excluir usuário.");
}

