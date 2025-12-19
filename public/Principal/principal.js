let player;

// Lista de exercícios sequenciais
let exercicios = [{
        nome: "Flexão",
        repeticao: "2/10",
        link: "https://www.youtube.com/embed/vmLkO94sV4g?enablejsapi=1"
    },
    {
        nome: "Agachamento",
        repeticao: "1/10",
        link: "https://www.youtube.com/embed/1hwfU_uSQ2k?enablejsapi=1"
    }
    // 👉 adicione mais exercícios aqui
];

// Recupera progresso salvo ou começa do zero
let indiceAtual = parseInt(localStorage.getItem("indiceTreino")) || 0;

document.addEventListener("DOMContentLoaded", () => {
    // 🌙 Modo escuro
    const escuro = localStorage.getItem("modoEscuro") === "true";
    if (escuro) document.body.classList.add("dark");

    // ♿ Acessibilidade
    const acessibilidade = localStorage.getItem("acessibilidade") === "true";
    if (acessibilidade) document.body.classList.add("acessibilidade");

    // 🔥 Elementos da tela principal
    const fogoEl = document.querySelector("#fogo");
    const moedasEl = document.querySelector("#moedas");
    const xpEl = document.querySelector("#xp");
    const btnTreino = document.querySelector("#btn-treino");
    const welcomeEl = document.querySelector(".welcome p");

    const tituloTreino = document.querySelector(".titulo-box h2");
    const serieTreino = document.querySelector(".titulo-box p");
    const videoFrame = document.getElementById("videoFrame");

    // HUD overlay
    const modalTitulo = document.getElementById("exercicioNome");
    const modalSerie = document.getElementById("exercicioSerie");

    const mensagens = [
        "🔥 Continue firme, cada treino conta!",
        "💪 A disciplina vence a motivação!",
        "⚡ Você está mais forte do que ontem!",
        "🏆 O esforço de hoje é a vitória de amanhã!"
    ];

    // 🎥 Modal de vídeo
    const videoModal = document.getElementById("videoModal");
    const closeModal = document.getElementById("closeModal");
    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const restartBtn = document.getElementById("restartBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const finishBtn = document.getElementById("finishBtn");

    // Função para carregar exercício atual
    function carregarExercicio(index) {
        const ex = exercicios[index];

        // Atualiza a tela principal
        tituloTreino.textContent = ex.nome;
        serieTreino.textContent = ex.repeticao;

        // Atualiza HUD overlay
        if (modalTitulo) modalTitulo.textContent = ex.nome;
        if (modalSerie) modalSerie.textContent = ex.repeticao;

        videoFrame.src = ex.link;

        // Salva progresso
        localStorage.setItem("indiceTreino", index);
    }

    // Inicializa com o exercício atual
    carregarExercicio(indiceAtual);

    // 🏋️ Botão de treino → abre modal
    if (btnTreino) {
        btnTreino.addEventListener("click", () => {
            videoModal.style.display = "block";
        });
    }

    // ❌ Fechar modal
    if (closeModal) {
        closeModal.addEventListener("click", () => {
            videoModal.style.display = "none";
            if (player) player.stopVideo();
        });
    }

    // ▶️ Play
    if (playBtn) playBtn.addEventListener("click", () => player && player.playVideo());

    // ⏸️ Pause
    if (pauseBtn) pauseBtn.addEventListener("click", () => player && player.pauseVideo());

    // 🔄 Reiniciar
    if (restartBtn) {
        restartBtn.addEventListener("click", () => {
            if (player) {
                player.seekTo(0);
                player.playVideo();
            }
        });
    }

    // ⏮️ Exercício anterior
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (indiceAtual > 0) {
                indiceAtual--;
                carregarExercicio(indiceAtual);
            } else {
                alert("Você já está no primeiro exercício!");
            }
        });
    }

    // ⏭️ Próximo exercício
    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            indiceAtual++;
            if (indiceAtual < exercicios.length) {
                carregarExercicio(indiceAtual);
            } else {
                alert("🏆 Treino concluído!");
                finalizarTreino();
            }
        });
    }

    // ✅ Finalizar treino → chama API
    if (finishBtn) {
        finishBtn.addEventListener("click", finalizarTreino);
    }

    async function finalizarTreino() {
        try {
            const res = await fetch("/api/treino", { method: "POST" });
            const data = await res.json();

            if (data.sucesso) {
                fogoEl.textContent = data.fogo;
                moedasEl.textContent = data.moedas;
                xpEl.textContent = data.xp;

                const msg = mensagens[Math.floor(Math.random() * mensagens.length)];
                welcomeEl.textContent = msg;

                alert(`🔥 +1 fogo | 💰 +5 moedas | ⭐ +10 XP`);
                videoModal.style.display = "none";
                if (player) player.stopVideo();
            } else {
                alert("Erro: " + (data.erro || "Não foi possível atualizar"));
            }
        } catch (err) {
            console.error("❌ Erro no treino:", err);
            alert("Erro ao registrar treino.");
        }
    }

    // 🏆 Ranking (se existir na tela principal)
    const lista = document.querySelector(".ranking-list");
    if (lista) {
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

        fetch("/api/ranking")
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
    }
});

// 📺 API do YouTube
function onYouTubeIframeAPIReady() {
    player = new YT.Player("videoFrame");
}