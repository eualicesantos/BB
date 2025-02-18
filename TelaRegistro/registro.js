function registerUser() {
    // Captura os valores dos campos
    let username = document.getElementById("new-username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("new-password").value;

    // Simulação de salvamento (substituir por backend real se necessário)
    if (username && email && password) {
        alert("Registro realizado com sucesso!");

        // Redireciona para usuario.html após o registro
        window.location.href = "usuario.html";
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

