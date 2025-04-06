const express = require("express");
const router = express.Router();
const { createUser, getUsers, getUserById, updateUser, deleteUser } = require("../controllers/userController");

router.post("/", createUser);  // Adiciona um novo usuário
router.get("/", getUsers);  // Lista todos os usuários
router.get("/:id", getUserById);  // Busca um usuário pelo ID
router.put("/:id", updateUser);  // Atualiza um usuário
router.delete("/:id", deleteUser);  // Remove um usuário

module.exports = router;