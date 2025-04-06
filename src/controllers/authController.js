const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../data/user');
require('dotenv').config();

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica se o usuário existe
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        // Verifica a senha (se estiver usando hash, senão usa user.password === password)
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        // Gera o token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao fazer login', details: error.message });
    }
};

module.exports = { loginUser };