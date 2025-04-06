const ItemUser = require('../data/itemuser');
const User = require('../data/user');
const Item = require('../data/item');

// Criar uma relação entre Usuário e Item
const addItemToUser = async (req, res) => {
    try {
        const { userId, itemId, relationType } = req.body;

        // Verifica se usuário e item existem
        const user = await User.findByPk(userId);
        const item = await Item.findByPk(itemId);

        if (!user || !item) {
            return res.status(404).json({ error: 'Usuário ou Item não encontrado' });
        }

        // Cria a relação
        const itemUser = await ItemUser.create({
            userId,
            itemId,
            relation_type: relationType // Garantindo que o nome está correto
        });
        res.status(201).json(itemUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao associar item ao usuário', details: error.message });
    }
};

const getUserItems = async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId, {
            include: {
                model: Item,
                through: { attributes: [] }, // 🔹 Remove os dados intermediários desnecessários
            },
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(user.items);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar itens do usuário', details: error.message });
    }
};

// Buscar todas as relações entre usuários e itens
const getAllItemUserRelations = async (req, res) => {
    try {
        const relations = await ItemUser.findAll();
        res.json(relations);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar relações entre usuários e itens', details: error.message });
    }
};

// Remover a relação entre usuário e item
const removeItemFromUser = async (req, res) => {
    try {
        const { userId, itemId } = req.params;

        const itemUser = await ItemUser.findOne({ where: { userId, itemId } });

        if (!itemUser) {
            return res.status(404).json({ error: 'Relação não encontrada' });
        }

        await itemUser.destroy();
        res.json({ message: 'Relação removida com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover item do usuário', details: error.message });
    }
};

module.exports = { addItemToUser, getUserItems, removeItemFromUser, getAllItemUserRelations };