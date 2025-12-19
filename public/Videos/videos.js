document.addEventListener("DOMContentLoaded", () => {
    // 🌙 Aplicar modo escuro
    const escuro = localStorage.getItem("modoEscuro") === "true";
    if (escuro) {
        document.body.classList.add("dark");
        console.log("🌙 Modo escuro ativado");
    }

    // ♿ Aplicar acessibilidade
    const acessibilidade = localStorage.getItem("acessibilidade") === "true";
    if (acessibilidade) {
        document.body.classList.add("acessibilidade");
        console.log("♿ Acessibilidade ativada");
    }

    // 🎥 Lista de vídeos
    const lista = document.querySelector(".videos-list");
    if (!lista) return;

    // 🔨 Função para criar card de vídeo
    function criarItem(video) {
        const item = document.createElement("div");
        item.className = "video-item";
        item.innerHTML = `
      <a href="${video.link}" target="_blank" rel="noopener">
        <img src="${video.thumb}" alt="${video.titulo}" class="video-thumb" />
        <span class="video-title">${video.titulo}</span>
      </a>
    `;
        return item;
    }

    // 📦 Fallback com vídeos mock caso a API falhe
    function carregarFallback() {
        const mock = [{
                titulo: "10 exercícios essenciais na musculação",
                thumb: "img/10 exercícios essenciais na musculação.jpg",
                link: "https://youtu.be/QVAmbJrlyvk?si=R-5yrcLwvuN4fhfN"
            },
            {
                titulo: "Receitas saudáveis para o lanche da tarde",
                thumb: "img/RECEITAS SAUDÁVEIS.jpg",
                link: "https://youtu.be/OVPcb470aic?si=DI8cbXK8Y0sNj2Ey"
            },
            {
                titulo: "Alongamento dinâmico e mobilidade",
                thumb: "img/ALONGAMENTO DINÂMICO.jpg",
                link: "https://youtu.be/F1iejoRbRts?si=CdUh49UJJhL7p0Ba"
            },
            {
                titulo: "Veja a produção do site 🤔",
                thumb: "img/90663998-vector-flat-icon-of-question-mark-on-black-background.jpg",
                link: "https://youtu.be/dQw4w9WgXcQ?si=XXUFZkflVYEqP1We"
            }
        ];
        lista.innerHTML = "";
        mock.forEach(video => lista.appendChild(criarItem(video)));
        console.log("📦 Fallback carregado (mock de vídeos)");
    }

    // 🌐 Tentar carregar da API
    fetch("/api/videos")
        .then(res => {
            if (!res.ok) throw new Error("API de vídeos indisponível");
            return res.json();
        })
        .then(data => {
            lista.innerHTML = "";
            if (!Array.isArray(data) || data.length === 0) {
                lista.innerHTML = "<p>Nenhum vídeo encontrado.</p>";
                return;
            }
            data.forEach(video => lista.appendChild(criarItem(video)));
            console.log("✅ Vídeos carregados da API");
        })
        .catch(err => {
            console.error("❌ Erro ao carregar vídeos:", err);
            carregarFallback(); // usa mock para não deixar a tela vazia
        });
});