document.addEventListener("DOMContentLoaded", () => {
    const escuro = document.querySelector("#modo-escuro");
    const acessibilidade = document.querySelector("#acessibilidade");
    const som = document.querySelector("#som");
    const vibracao = document.querySelector("#vibracao");
    const linguagem = document.querySelector("#linguagem");
    const btnSair = document.querySelector("#btn-sair");

    // 🔄 Funções de aplicação
    function aplicarModoEscuro(ativo) {
        document.body.classList.toggle("dark", ativo);
    }

    function aplicarAcessibilidade(ativo) {
        document.body.classList.toggle("acessibilidade", ativo);
    }

    // 📥 Carregar preferências salvas
    escuro.checked = localStorage.getItem("modoEscuro") === "true";
    acessibilidade.checked = localStorage.getItem("acessibilidade") === "true";
    som.checked = localStorage.getItem("som") === "true";
    vibracao.checked = localStorage.getItem("vibracao") === "true";
    linguagem.value = localStorage.getItem("linguagem") || "pt";

    // Aplicar imediatamente
    aplicarModoEscuro(escuro.checked);
    aplicarAcessibilidade(acessibilidade.checked);

    // 📤 Eventos de mudança
    escuro.addEventListener("change", () => {
        localStorage.setItem("modoEscuro", escuro.checked);
        aplicarModoEscuro(escuro.checked);
    });

    acessibilidade.addEventListener("change", () => {
        localStorage.setItem("acessibilidade", acessibilidade.checked);
        aplicarAcessibilidade(acessibilidade.checked);
    });

    som.addEventListener("change", () => {
        localStorage.setItem("som", som.checked);
    });

    vibracao.addEventListener("change", () => {
        localStorage.setItem("vibracao", vibracao.checked);
    });

    linguagem.addEventListener("change", () => {
        localStorage.setItem("linguagem", linguagem.value);
    });

    // 🚪 Botão sair
    btnSair.addEventListener("click", () => {
        window.location.href = "/principal.html";
    });
});