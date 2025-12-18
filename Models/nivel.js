const { DataTypes } = require("sequelize");
const Banco = require("../config/trainbanco");

const Nivel = Banco.define("Nivel", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  nivel: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "niveis",
  timestamps: false
});

module.exports = Nivel;
