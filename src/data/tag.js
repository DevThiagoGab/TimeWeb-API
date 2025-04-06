const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Tag = sequelize.define('tag', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
}, {
    tableName: 'tags',
    timestamps: true,
});

module.exports = Tag;