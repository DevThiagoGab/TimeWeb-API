const Item = require('../data/item');
const Tag = require('../data/tag');
const ItemTag = require('../data/itemtag');

// Criar um novo item (Create)
const createItem = async (req, res) => {
    try {
        const { name, description, image_url } = req.body;
        const newItem = await Item.create({ name, description, image_url });
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar item', details: error.message });
    }
};

// Buscar todos os itens (Read)
const getItems = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        const items = await Item.findAll({ limit, offset });
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar itens', details: error.message });
    }
};

// Buscar um item por ID junto com as tags associadas
const getItemByIdWithTags = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id, {
            include: {
                model: Tag,
                through: { attributes: [] }, // Evita trazer os dados extras da tabela intermediária
            },
        });

        if (!item) {
            return res.status(404).json({ error: 'Item não encontrado' });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar item com tags', details: error.message });
    }
};

// Atualizar item (Update)
const updateItem = async (req, res) => {
    try {
        const { name, description, image_url } = req.body;
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item não encontrado' });

        await item.update({ name, description, image_url });
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar item', details: error.message });
    }
};

// Deletar item (Delete)
const deleteItem = async (req, res) => {
    try {
        const item = await Item.findByPk(req.params.id);
        if (!item) return res.status(404).json({ error: 'Item não encontrado' });

        await item.destroy();
        res.json({ message: 'Item deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar item', details: error.message });
    }
};

module.exports = { createItem, getItems, getItemByIdWithTags, updateItem, deleteItem };