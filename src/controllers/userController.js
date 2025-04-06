const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../data/user');
const Item = require('../data/item');
const Tag = require('../data/tag');

//Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(401).json({ error: 'Senha inválida' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro no login', details: error.message });
    }
};

// Criar um novo usuário (Create)
const createUser = async (req, res) => {
    try {
        const { firstName, lastName, email, username, password } = req.body;

        // Gera o hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Cria o usuário com senha criptografada
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword
        });

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
    }
};

// Buscar todos os usuários (Read)
const getUsers = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10; // padrão: 10
        const offset = parseInt(req.query.offset) || 0; // padrão: 0

        const users = await User.findAll({
            limit,
            offset
        });

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

        let updatedData = { firstName, lastName, email, username };

        // Se a senha foi enviada, atualiza com hash
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updatedData.password = hashedPassword;
        }

        await user.update(updatedData);
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

const getUserItemsWithTags = async (req, res) => {
    try {
        const { id: userId } = req.params;

        const user = await User.findByPk(userId, {
            include: {
                model: Item,
                include: {
                    model: Tag,
                    through: { attributes: [] }
                },
                through: { attributes: [] }
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar itens com tags do usuário', details: error.message });
    }
};

module.exports = { login, createUser, getUsers, getUserById, updateUser, deleteUser, getUserItemsWithTags };