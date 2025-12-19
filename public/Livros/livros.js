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

    // 📚 Lista de livros
    const lista = document.querySelector(".livros-list");
    if (!lista) return;

    // 🔨 Função para criar card de livro
    function criarItem(livro) {
        const item = document.createElement("div");
        item.className = "livro-item";
        item.innerHTML = `
      <a href="${livro.pdf}" target="_blank">
        <img src="${livro.capa}" alt="${livro.nome}" class="livro-capa" />
        <span class="nome">${livro.nome || "Sem título"}</span>
      </a>
    `;
        return item;
    }

    // 📦 Fallback com livros mock caso a API falhe
    function carregarFallback() {
        const mock = [{
                nome: "E-book de Musculação",
                capa: "img/E-book-de-Musculacao-Tiagonutri.pdf.jpg",
                pdf: "https://tiagonutri.com.br/wp-content/uploads/2024/06/E-book-de-Musculacao-Tiagonutri.pdf"
            },
            {
                nome: "E-book de Receitas",
                capa: "img/E-book-de-receitas-Tiagonuti.pdf.jpg",
                pdf: "https://tiagonutri.com.br/wp-content/uploads/2024/06/E-book-de-receitas-Tiagonuti.pdf"
            },
            {
                nome: "Guia de Atividade Física",
                capa: "img/guia_atividade_fisica_populacao_brasileira.pdf.jpg",
                pdf: "https://bvsms.saude.gov.br/bvs/publicacoes/guia_atividade_fisica_populacao_brasileira.pdf"
            }
        ];
        lista.innerHTML = "";
        mock.forEach(livro => lista.appendChild(criarItem(livro)));
    }

    // 🌐 Tentar carregar da API
    fetch("/api/livros")
        .then(res => {
            if (!res.ok) throw new Error("API de livros indisponível");
            return res.json();
        })
        .then(data => {
            lista.innerHTML = "";
            if (!Array.isArray(data) || data.length === 0) {
                lista.innerHTML = "<p>Nenhum livro encontrado.</p>";
                return;
            }
            data.forEach(livro => lista.appendChild(criarItem(livro)));
        })
        .catch(err => {
            console.error("❌ Erro ao carregar livros:", err);
            carregarFallback();
        });
});