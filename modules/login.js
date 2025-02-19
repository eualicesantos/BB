function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simulação de usuários cadastrados
    const users = [
        { username: "admin", password: "1234", code: 0 }, // Administrador
        { username: "user", password: "1234", code: 1 }    // Usuário comum
    ];

    // Verifica se o usuário existe
    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        if (user.code === 0) {
            window.location.href = "../Viws/usuario.html"; // Redireciona Admin
        } else if (user.code === 1) {
            window.location.href = "../Viws/usuarioPadrao.html"; // Redireciona Usuário Comum
        }
    } else {
        alert("Usuário ou senha inválidos!");
    }
}

