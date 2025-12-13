document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const login = document.getElementById('login').value;
    const senha = document.getElementById('senha').value;

    if (login === "usuario" && senha === "1234") {
        alert("Login bem-sucedido!");
    } else {
        alert("Login inválido.");
    }
});