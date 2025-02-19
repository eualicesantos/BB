document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const formData = new FormData(this);

    try {
        const response = await fetch("/register", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            window.location.href = "/painel-usuario.html"; // Certifique-se de que esta página existe
        } else {
            const errorText = await response.text();
            alert("Erro no registro: " + errorText);
        }
    } catch (error) {
        alert("Erro ao conectar ao servidor. Tente novamente.");
    }
});

