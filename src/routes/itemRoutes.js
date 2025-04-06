const express = require('express');
const router = express.Router();
const { createItem, getItems, getItemById, updateItem, deleteItem } = require('../controllers/itemController');
const { getItemByIdWithTags } = require('../controllers/itemController');

router.post('/', createItem);      // Criar item
router.get('/', getItems);         // Buscar todos os itens
router.get('/:id/tags', getItemByIdWithTags);   // Buscar item por ID
router.put('/:id', updateItem);    // Atualizar item
router.delete('/:id', deleteItem); // Deletar item

module.exports = router;