const express = require('express');
const { addItemToUser, getUserItems, removeItemFromUser, getAllItemUserRelations } = require('../controllers/itemUserController');

const router = express.Router();

router.post('/', addItemToUser);                                // Associar um item a um usuário
router.get('/', getAllItemUserRelations);                      // Buscar todas as relações usuário-item
router.get('/:userId/items', getUserItems);                    // Buscar todos os itens de um usuário
router.delete('/:userId/items/:itemId', removeItemFromUser);   // Remover a relação entre usuário e item

module.exports = router;