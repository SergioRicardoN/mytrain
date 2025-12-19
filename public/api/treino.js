const express = require("express");
const router = express.Router();
const Usuario = require("../Models/Usuario");

// Rota GET /api/ranking
router.get("/", async(req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            attributes: ["nome", "fogo", "moedas", "xp"],
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

module.exports = router;