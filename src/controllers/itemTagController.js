const ItemTag = require('../data/itemtag');
const Item = require('../data/item');
const Tag = require('../data/tag');

// Associar uma tag a um item
const addTagToItem = async (req, res) => {
    try {
        const { itemId, tagId } = req.body;

        // Verifica se o item e a tag existem
        const item = await Item.findByPk(itemId);
        const tag = await Tag.findByPk(tagId);

        if (!item || !tag) {
            return res.status(404).json({ error: 'Item ou Tag não encontrados' });
        }

        // Cria a associação
        const itemTag = await ItemTag.create({ itemId, tagId });
        res.status(201).json(itemTag);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao associar tag ao item', details: error.message });
    }
};

// Buscar todas as associações de itens com tags
const getItemTags = async (req, res) => {
    try {
        const itemTags = await ItemTag.findAll();
        res.json(itemTags);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar associações', details: error.message });
    }
};

// Remover uma tag de um item
const removeTagFromItem = async (req, res) => {
    try {
        const { itemId, tagId } = req.params;

        // Busca a relação
        const itemTag = await ItemTag.findOne({ where: { itemId, tagId } });

        if (!itemTag) {
            return res.status(404).json({ error: 'Associação não encontrada' });
        }

        // Remove a associação
        await itemTag.destroy();
        res.json({ message: 'Tag removida do item com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover tag do item', details: error.message });
    }
};

module.exports = { addTagToItem, getItemTags, removeTagFromItem };