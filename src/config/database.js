const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config();

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '../../../data/database.sqlite'), // Caminho correto
    logging: console.log, // Pode remover se não quiser logs
});

module.exports = sequelize;