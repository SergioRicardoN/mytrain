const Sequelize = require('sequelize');
const Banco = require('../config/trainbanco.js');

const usuario = Banco.define(
    "UsuarioDados", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        }, 
        nome:{
          type: Sequelize.STRING,
          allowNull: false,  
        },
        email:{
            type: Sequelize.STRING,
            allowNull: false,
        },
        senha:{
            type: Sequelize.STRING,
            allowNull: false,
        }
    }
)

module.exports = usuario