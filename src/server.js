require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
app.use(express.json()); // Permite receber JSON
app.use(cors()); // Habilita CORS

const PORT = process.env.PORT || 3000;

// Testa a conexão com o banco
sequelize.authenticate()
    .then(() => console.log("Conexão com o banco de dados estabelecida com sucesso!"))
    .catch((err) => console.error("Não foi possível conectar ao banco de dados:", err));

// Importando rotas
const userRoutes = require("./routes/userRoutes");
const itemRoutes = require('./routes/itemRoutes');
const tagRoutes = require('./routes/tagRoutes');
const itemTagRoutes = require('./routes/itemTagRoutes');
const itemUserRoutes = require('./routes/itemUserRoutes');
const auth = require('./middlewares/authMiddleware');

app.use("/users", userRoutes);
app.use('/items', auth, itemRoutes);
app.use('/tags', auth, tagRoutes);
app.use('/item-tags', auth, itemTagRoutes);
app.use('/item-user', auth, itemUserRoutes);
app.use('/upload', uploadRoutes);
app.use('/uploads', express.static('uploads'));

// Rota principal
app.get("/", (req, res) => {
    res.send("API rodando");
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});