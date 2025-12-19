const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const session = require("express-session");
const sequelize = require("./config/trainbanco");

// Models
const Usuario = require("./Models/Usuario");
const Nivel = require("./Models/nivel");
const Objetivo = require("./Models/objetivo");
const Estilo = require("./Models/estilo");
const Modo = require("./Models/modo");

const app = express();
const PORT = 3000;

// ------------------ Conexão com o banco ------------------
sequelize.authenticate()
    .then(() => console.log("✅ Conexão com MySQL estabelecida!"))
    .catch(err => console.error("❌ Erro na conexão:", err.message));

sequelize.sync({ alter: true })
    .then(() => console.log("✅ Banco sincronizado com Sequelize!"))
    .catch(() => console.log("❌ Erro ao sincronizar com o banco"));

// ------------------ Middlewares ------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Sessão
app.use(session({
    secret: "segredo-mytrain",
    resave: false,
    saveUninitialized: true
}));

// ------------------ Rotas GET (páginas) ------------------
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "public/index.html")));
app.get("/criar-conta.html", (req, res) => res.sendFile(path.join(__dirname, "public/criar-conta.html")));
app.get("/selecao.html", (req, res) => res.sendFile(path.join(__dirname, "public/selecao.html")));
app.get("/objetivo.html", (req, res) => res.sendFile(path.join(__dirname, "public/objetivo.html")));
app.get("/estilo.html", (req, res) => res.sendFile(path.join(__dirname, "public/estilo.html")));
app.get("/modo.html", (req, res) => res.sendFile(path.join(__dirname, "public/modo.html")));
app.get("/carregamento.html", (req, res) => res.sendFile(path.join(__dirname, "public/carregamento.html")));
app.get("/final.html", (req, res) => res.sendFile(path.join(__dirname, "public/final.html")));
app.get("/erro-login.html", (req, res) => res.sendFile(path.join(__dirname, "public/erro-login.html")));
app.get("/recuperar-senha-confirmacao.html", (req, res) => res.sendFile(path.join(__dirname, "public/recuperar-senha-confirmacao.html")));
app.get("/principal.html", (req, res) => res.sendFile(path.join(__dirname, "public/principal.html")));
app.get("/config.html", (req, res) => res.sendFile(path.join(__dirname, "public/config.html")));
app.get("/ranking.html", (req, res) => res.sendFile(path.join(__dirname, "public/ranking.html")));
app.get("/livros.html", (req, res) => res.sendFile(path.join(__dirname, "public/livros.html")));
app.get("/videos.html", (req, res) => res.sendFile(path.join(__dirname, "public/videos.html")));

// ------------------ Rotas POST (fluxo com banco) ------------------

// Cadastro de usuário
app.post("/criar-conta", async(req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const usuario = await Usuario.create({ nome, email, senha });
        req.session.usuarioId = usuario.id;
        console.log("👤 Usuário criado:", usuario.nome);
        return res.redirect("/selecao.html");
    } catch (err) {
        console.error("❌ Erro ao criar usuário:", err.message);
        res.redirect("/erro-login.html");
    }
});

// Login
app.post("/login", async(req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email, senha } });
        if (!usuario) return res.redirect("/erro-login.html");

        req.session.usuarioId = usuario.id;
        console.log("🔓 Login efetuado:", usuario.nome);

        const [nivel, objetivo, estilo, modo] = await Promise.all([
            Nivel.findOne({ where: { usuario_id: usuario.id } }),
            Objetivo.findOne({ where: { usuario_id: usuario.id } }),
            Estilo.findOne({ where: { usuario_id: usuario.id } }),
            Modo.findOne({ where: { usuario_id: usuario.id } })
        ]);

        if (nivel && objetivo && estilo && modo) {
            return res.redirect("/principal.html");
        } else {
            return res.redirect("/selecao.html");
        }
    } catch (err) {
        console.error("❌ Erro no login:", err.message);
        res.redirect("/erro-login.html");
    }
});

// Recuperar senha (simulado)
app.post("/recuperar-senha", async(req, res) => {
    const { email } = req.body;
    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) return res.redirect("/erro-login.html");
        res.redirect("/recuperar-senha-confirmacao.html");
    } catch (err) {
        console.error("❌ Erro ao recuperar senha:", err.message);
        res.redirect("/erro-login.html");
    }
});

// Salvar nível
app.post("/nivel", async(req, res) => {
    const { nivel } = req.body;
    const usuarioId = req.session.usuarioId;
    try {
        await Nivel.create({ usuario_id: usuarioId, nivel });
        console.log("📊 Nível salvo:", nivel);
        res.redirect("/objetivo.html");
    } catch (err) {
        console.error("❌ Erro ao salvar nível:", err.message);
        res.redirect("/erro-login.html");
    }
});

// Salvar objetivo
app.post("/objetivo", async(req, res) => {
    const { objetivo } = req.body;
    const usuarioId = req.session.usuarioId;
    try {
        await Objetivo.create({ usuario_id: usuarioId, objetivo });
        console.log("🎯 Objetivo salvo:", objetivo);
        res.redirect("/estilo.html");
    } catch (err) {
        console.error("❌ Erro ao salvar objetivo:", err.message);
        res.redirect("/erro-login.html");
    }
});

// Salvar estilo
app.post("/salvar-estilo", async(req, res) => {
    const { estilo } = req.body;
    const usuarioId = req.session.usuarioId;
    try {
        await Estilo.create({ usuario_id: usuarioId, estilo });
        console.log("💪 Estilo salvo:", estilo);
        res.redirect("/modo.html");
    } catch (err) {
        console.error("❌ Erro ao salvar estilo:", err.message);
        res.redirect("/erro-login.html");
    }
});

// Salvar modo
app.post("/salvar-modo", async(req, res) => {
    const { modo } = req.body;
    const usuarioId = req.session.usuarioId;
    if (!usuarioId) return res.redirect("/erro-login.html");

    try {
        await Modo.create({ usuario_id: usuarioId, modo });
        console.log("⚡ Modo salvo:", modo);
        res.redirect("/carregamento.html");
    } catch (err) {
        console.error("❌ Erro ao salvar modo:", err.message);
        res.redirect("/erro-login.html");
    }
});

// ------------------ APIs ------------------

// Ranking (Top 10 por fogo)
app.get("/api/ranking", async(req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ["nome", "email", "fogo", "moedas", "xp"],
            order: [
                ["fogo", "DESC"]
            ],
            limit: 10
        });
        res.json(usuarios);
    } catch (err) {
        console.error("❌ Erro ao buscar ranking:", err);
        res.status(500).json({ erro: "Erro interno ao buscar ranking." });
    }
});

// Atualizar progresso do treino
app.post("/api/treino", async(req, res) => {
    try {
        if (!req.session.usuarioId) {
            return res.status(401).json({ erro: "Usuário não autenticado" });
        }

        const usuario = await Usuario.findByPk(req.session.usuarioId);
        if (!usuario) return res.status(404).json({ erro: "Usuário não encontrado" });

        usuario.fogo = (usuario.fogo || 0) + 1;
        usuario.moedas = (usuario.moedas || 0) + 5;
        usuario.xp = (usuario.xp || 0) + 10;

        await usuario.save();

        res.json({
            sucesso: true,
            fogo: usuario.fogo,
            moedas: usuario.moedas,
            xp: usuario.xp
        });
    } catch (err) {
        console.error("❌ Erro ao atualizar treino:", err);
        res.status(500).json({ erro: "Erro interno ao atualizar treino" });
    }
});

// ------------------ API Livros ------------------
app.get("/api/livros", (req, res) => {
    const livros = [{
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
    res.json(livros);
});

// ------------------ API Vídeos ------------------
app.get("/api/videos", (req, res) => {
    const videos = [{
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
    res.json(videos);
});

// ------------------ Inicialização ------------------
app.listen(PORT, () => {
    console.log("🚀 Servidor rodando em http://localhost:" + PORT);
    console.log("👉 Certifique-se de que os arquivos HTML estão dentro da pasta public/");
});