const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Item = require('./item');

const ItemUser = sequelize.define('itemuser', {
    relation_type: {
        type: DataTypes.ENUM('CREATOR', 'RECEIVER'),
        allowNull: false,
    },
}, {
    tableName: 'item_users',
    timestamps: true,
});

// 🔹 Corrigindo associações corretamente
User.belongsToMany(Item, { through: ItemUser, foreignKey: 'userId', otherKey: 'itemId' });
Item.belongsToMany(User, { through: ItemUser, foreignKey: 'itemId', otherKey: 'userId' });

ItemUser.belongsTo(User, { foreignKey: 'userId' });
ItemUser.belongsTo(Item, { foreignKey: 'itemId' });

module.exports = ItemUser;