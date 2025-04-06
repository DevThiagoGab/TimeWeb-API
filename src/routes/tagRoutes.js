const express = require('express');
const router = express.Router();
const { createTag, getTags, getTagById, updateTag, deleteTag } = require('../controllers/tagController');

router.post('/', createTag);       // Criar tag
router.get('/', getTags);          // Buscar todas as tags
router.get('/:id', getTagById);    // Buscar tag por ID
router.put('/:id', updateTag);     // Atualizar tag
router.delete('/:id', deleteTag);  // Deletar tag

module.exports = router;