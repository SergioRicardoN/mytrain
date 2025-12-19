const Sequelize = require('sequelize');
const Banco = require('../config/trainbanco.js');

const usuario = Banco.define("UsuarioDados", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    fogo: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    moedas: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    xp: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
});

module.exports = usuario;