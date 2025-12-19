const { Sequelize } = require("sequelize");

const Banco = new Sequelize("mytrain", "root", "Sergio12!", {
    host: "localhost",
    dialect: "mysql",
    logging: false
});

module.exports = Banco;