const { Sequelize } = require("sequelize");

const Banco = new Sequelize("mytrain", "aluno", "ifpecjbg", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

module.exports = Banco;
