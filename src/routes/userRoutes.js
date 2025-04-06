const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser, getUserItemsWithTags } = require("../controllers/userController");
const { loginUser } = require("../controllers/authController");

router.post("/login", loginUser); // Rota de login

router.post("/", createUser);  // Adiciona um novo usuário
router.get("/", getUsers);  // Lista todos os usuários
router.get("/:id", getUserById);  // Busca um usuário pelo ID
router.put("/:id", updateUser);  // Atualiza um usuário
router.delete("/:id", deleteUser);  // Remove um usuário
router.get('/:id/items-with-tags', getUserItemsWithTags); // Lista usuários, itens e tags

module.exports = router;