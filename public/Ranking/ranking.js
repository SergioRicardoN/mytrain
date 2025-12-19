document.addEventListener("DOMContentLoaded", () => {
    // 🌙 Aplicar modo escuro
    const escuro = localStorage.getItem("modoEscuro") === "true";
    if (escuro) {
        document.body.classList.add("dark");
    }

    // ♿ Aplicar acessibilidade
    const acessibilidade = localStorage.getItem("acessibilidade") === "true";
    if (acessibilidade) {
        document.body.classList.add("acessibilidade");
    }

    const lista = document.querySelector(".ranking-list");

    function criarItem(usuario, index) {
        const medalha = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "";

        const item = document.createElement("div");
        item.className = "ranking-item" + (index === 0 ? " destaque" : "");
        item.innerHTML = `
      <span class="posicao">${index + 1}º ${medalha}</span>
      <span class="nome">${usuario.nome || "Sem nome"}</span>
      <span class="pontos">🔥 ${usuario.fogo || 0} | 💵 ${usuario.moedas || 0}</span>
    `;

        const emailLogado = localStorage.getItem("emailLogado");
        if (emailLogado && usuario.email === emailLogado) {
            item.classList.add("meu-ranking");
        }

        return item;
    }

    // 🏆 Buscar ranking
    fetch("/api/ranking") // <-- precisa existir no server.js
        .then(res => res.json())
        .then(data => {
            lista.innerHTML = "";
            data.forEach((usuario, index) => {
                lista.appendChild(criarItem(usuario, index));
            });
        })
        .catch(err => {
            console.error("❌ Erro ao carregar ranking:", err);
            lista.innerHTML = "<p>Erro ao carregar ranking.</p>";
        });
});