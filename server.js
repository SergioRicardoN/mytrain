const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require('./config/trainbanco');
const app = express();
const PORT = 3000;

sequelize.sync().then(function () {
    console.log("Conectou papai")
}).catch(function (){
    console.log("Errou papai")
});

let usuarios = [];
let niveis = [];
let objetivos = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));




app.post("/criar-conta", (req, res) => {
    const { nome, email, senha } = req.body;
    usuarios.push({ nome, email, senha });
    console.log("Usuário criado:", nome, email);
    res.redirect("/index.html");
});


app.post("/login", (req, res) => {
    const { email, senha } = req.body;
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (usuario) {
        res.redirect("/selecao.html");
    } else {
        res.redirect("/erro-login.html");
    }
});


app.post("/recuperar-senha", (req, res) => {
    const { email } = req.body;
    const usuario = usuarios.find(u => u.email === email);
    if (!usuario) {
        return res.redirect("/erro-login.html");
    }
    res.redirect("/recuperar-senha-confirmacao.html");
});


app.post("/nivel", (req, res) => {
    const { nivel } = req.body;
    niveis.push(nivel);
    console.log("Nível escolhido:", nivel);
    res.redirect("/objetivo.html");
});


app.post("/objetivo", (req, res) => {
    const { objetivo } = req.body;
    objetivos.push(objetivo);
    console.log("Objetivo escolhido:", objetivo);
    res.redirect("/dashboard.html");
});


app.listen(PORT, () => {
    console.log("Iniciando servidor...");
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});