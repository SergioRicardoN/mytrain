const { DataTypes } = require("sequelize");
const Banco = require("../config/trainbanco.js");

const Modo = Banco.define("Modo", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    modo: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: "modos",
    timestamps: false
});

module.exports = Modo;