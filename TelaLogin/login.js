function loginUser() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => {
        if (response.ok) {
            window.location.href = "/TelaUsuario/usuario.html";
        } else {
            alert("Usuário ou senha inválidos.");
        }
    })
    .catch(error => console.error("Erro ao fazer login:", error));
}
