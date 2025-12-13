document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formCriarConta");

    form.addEventListener("submit", (event) => {
        event.preventDefault(); // evita recarregar a página

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value.trim();

        // Validação simples
        if (nome === "" || email === "" || senha === "") {
            alert("Por favor, preencha todos os campos!");
            return;
        }

        if (!email.includes("@") || !email.includes(".")) {
            alert("Por favor, insira um email válido!");
            return;
        }

        if (senha.length < 6) {
            alert("A senha deve ter pelo menos 6 caracteres!");
            return;
        }

        // Simula salvar os dados
        localStorage.setItem("usuario_nome", nome);
        localStorage.setItem("usuario_email", email);
        localStorage.setItem("usuario_senha", senha);

        alert("Conta criada com sucesso!");

        // Redireciona para login
        window.location.href = "index.html";
    });
});