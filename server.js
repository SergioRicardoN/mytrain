const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const sequelize = require("./config/trainbanco");

//teste

// Models
const Usuario = require("./Models/Usuario");
const Nivel = require("./Models/nivel");
const Objetivo = require("./Models/objetivo");
const Estilo = require("./Models/estilo");

const app = express();
const PORT = 3000;

// Conexão com o banco
sequelize.sync().then(() => {
  console.log("✅ Conectado ao banco com Sequelize!");
}).catch(() => {
  console.log("❌ Erro ao conectar com o banco");
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ------------------ Rotas GET (páginas) ------------------

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/criar-conta.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/criar-conta.html"));
});

app.get("/selecao.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/selecao.html"));
});

app.get("/objetivo.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/objetivo.html"));
});

app.get("/estilo.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/estilo.html"));
});

app.get("/erro-login.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/erro-login.html"));
});

app.get("/recuperar-senha-confirmacao.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/recuperar-senha-confirmacao.html"));
});

app.get("/final.html", (req, res) => {
  res.sendFile(path.join(__dirname, "public/final.html"));
});

// ------------------ Rotas POST (fluxo com banco) ------------------

// Cadastro de usuário
app.post("/criar-conta", async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuario = await Usuario.create({ nome, email, senha });
    console.log("👤 Usuário criado:", usuario.nome);
    res.redirect("/selecao.html");
  } catch (err) {
    console.error("❌ Erro ao criar usuário:", err.message);
    res.redirect("/erro-login.html");
  }
});

// Login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email, senha } });
    if (usuario) {
      console.log("🔓 Login efetuado:", usuario.nome);
      res.redirect("/selecao.html");
    } else {
      res.redirect("/erro-login.html");
    }
  } catch (err) {
    console.error("❌ Erro no login:", err.message);
    res.redirect("/erro-login.html");
  }
});

// Recuperar senha (simulado)
app.post("/recuperar-senha", async (req, res) => {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.redirect("/erro-login.html");
    }
    res.redirect("/recuperar-senha-confirmacao.html");
  } catch (err) {
    console.error("❌ Erro ao recuperar senha:", err.message);
    res.redirect("/erro-login.html");
  }
});

// Salvar nível
app.post("/nivel", async (req, res) => {
  const { nivel } = req.body;
  const usuarioId = 1; // TODO: substituir por ID da sessão

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
app.post("/objetivo", async (req, res) => {
  const { objetivo } = req.body;
  const usuarioId = 1; // TODO: substituir por ID da sessão

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
app.post("/salvar-estilo", async (req, res) => {
  const { estilo } = req.body;
  const usuarioId = 1; // TODO: substituir por ID da sessão

  try {
    await Estilo.create({ usuario_id: usuarioId, estilo });
    console.log("💪 Estilo salvo:", estilo);
    res.redirect("/final.html");
  } catch (err) {
    console.error("❌ Erro ao salvar estilo:", err.message);
    res.redirect("/erro-login.html");
  }
});

// ------------------ Inicialização ------------------

app.listen(PORT, () => {
  console.log("🚀 Servidor rodando em http://localhost:" + PORT);
  console.log("👉 Certifique-se que os arquivos HTML estão dentro da pasta public/");
});
