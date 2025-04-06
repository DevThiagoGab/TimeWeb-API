const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Item = require('./item');
const Tag = require('./tag');

const ItemTag = sequelize.define('itemtag', {}, {
    tableName: 'item_tags',
    timestamps: false,
});

// Definindo as relações N:N entre Item e Tag
Item.belongsToMany(Tag, { through: ItemTag, foreignKey: 'itemId', otherKey: 'tagId' });
Tag.belongsToMany(Item, { through: ItemTag, foreignKey: 'tagId', otherKey: 'itemId' });

module.exports = ItemTag;