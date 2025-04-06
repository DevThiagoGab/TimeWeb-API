const Tag = require('../data/tag');

// Criar uma nova tag (Create)
const createTag = async (req, res) => {
    try {
        const { name } = req.body;
        const newTag = await Tag.create({ name });
        res.status(201).json(newTag);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar tag', details: error.message });
    }
};

// Buscar todas as tags (Read)
const getTags = async (req, res) => {
    try {
        const tags = await Tag.findAll();
        res.json(tags);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar tags', details: error.message });
    }
};

// Buscar tag por ID (Read)
const getTagById = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) return res.status(404).json({ error: 'Tag não encontrada' });
        res.json(tag);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar tag', details: error.message });
    }
};

// Atualizar tag (Update)
const updateTag = async (req, res) => {
    try {
        const { name } = req.body;
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) return res.status(404).json({ error: 'Tag não encontrada' });

        await tag.update({ name });
        res.json(tag);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar tag', details: error.message });
    }
};

// Deletar tag (Delete)
const deleteTag = async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id);
        if (!tag) return res.status(404).json({ error: 'Tag não encontrada' });

        await tag.destroy();
        res.json({ message: 'Tag deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar tag', details: error.message });
    }
};

module.exports = { createTag, getTags, getTagById, updateTag, deleteTag };