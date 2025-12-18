const { DataTypes } = require("sequelize");
const Banco = require("../config/trainbanco");

const Estilo = Banco.define("Estilo", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  estilo: { type: DataTypes.STRING, allowNull: false }
}, {
  tableName: "estilos",
  timestamps: false
});

module.exports = Estilo;
