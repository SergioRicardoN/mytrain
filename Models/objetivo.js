const { DataTypes } = require("sequelize");
const Banco = require("../config/trainbanco");

const Objetivo = Banco.define("Objetivo", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  objetivo: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "objetivos",
  timestamps: false
});

module.exports = Objetivo;
