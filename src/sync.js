const sequelize = require('./config/database');
const User = require('./data/user');  
const Item = require('./data/item');
const Tag = require('./data/tag');
const ItemUser = require('./data/itemuser');
const ItemTag = require('./data/itemtag');

async function syncDatabase() {
    try {
        await sequelize.sync({ force: true });
        console.log('Banco de dados sincronizado com sucesso!');
    } catch (error) {
        console.error('Erro ao sincronizar banco de dados:', error);
    } finally {
        await sequelize.close();
    }
}

syncDatabase();