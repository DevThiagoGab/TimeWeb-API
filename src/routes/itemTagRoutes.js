const express = require('express');
const router = express.Router();
const { addTagToItem, getItemTags, removeTagFromItem } = require('../controllers/itemTagController');

router.post('/', addTagToItem);                     // Associar tag a um item
router.get('/', getItemTags);                       // Buscar todas as associações
router.delete('/:itemId/:tagId', removeTagFromItem);// Remover tag de um item

module.exports = router;