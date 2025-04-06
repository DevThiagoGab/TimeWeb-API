const User = require('../data/user');

// Criar um novo usuário (Create)
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;
        const newUser = await User.create({ firstName, lastName, email, username, password });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
};

// Buscar todos os usuários (Read)
const getUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuários', details: error.message });
    }
};

// Buscar usuário por ID (Read)
const getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar usuário', details: error.message });
    }
};

// Atualizar usuário (Update)
const updateUser = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        await user.update({ firstName, lastName, email, username, password });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar usuário', details: error.message });
    }
};

// Deletar usuário (Delete)
const deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        await user.destroy();
        res.json({ message: 'Usuário deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar usuário', details: error.message });
    }
};

module.exports = { createUser, getUsers, getUserById, updateUser, deleteUser };