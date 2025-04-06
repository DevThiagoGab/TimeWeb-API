# Time-web-api
 
# 📦 REST API com Node.js, Express e Sequelize

API RESTful desenvolvida com Node.js, Express e Sequelize ORM. Implementa autenticação via JWT, CRUD completo para todas as entidades do sistema, paginação nas listagens e upload de arquivos local.

---

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Sequelize](https://sequelize.org/)
- [SQLite](https://www.sqlite.org/)
- [JWT](https://jwt.io/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [Multer](https://github.com/expressjs/multer)

---

## 🔐 Autenticação

- JWT obrigatório em **todas as rotas**, exceto:
  - `POST /users` → criação de usuário
  - `POST /users/login` → login do usuário

---

## 📂 Estrutura de Pastas

/config └── database.js # Configuração do Sequelize /controllers └── userController.js └── itemController.js └── tagController.js └── itemTagController.js └── itemUserController.js └── uploadController.js /data └── user.js └── item.js └── tag.js └── (demais modelos) /middlewares └── authMiddleware.js /routes └── userRoutes.js └── itemRoutes.js └── tagRoutes.js └── itemTagRoutes.js └── itemUserRoutes.js └── uploadRoutes.js /uploads └── (arquivos enviados) .env .gitignore index.js

## 📌 Funcionalidades

### ✅ CRUD Completo para:

- **Usuários**
- **Itens**
- **Tags**
- **Relacionamento Itens-Tags**
- **Relacionamento Itens-Usuários**

### ✅ Autenticação com JWT
- Geração de token no login
- Proteção via middleware

### ✅ Upload de arquivos (local)
- `POST /upload`
- Os arquivos são salvos localmente em `/uploads`
- O caminho do arquivo pode ser armazenado no banco

### ✅ Paginação
- Todas as rotas de listagem aceitam `?limit=` e `?offset=` como parâmetros de paginação.

---

## 🔧 Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/DevThiagoGab/TimeWeb-API

# 2. Acesse o diretório
cd TimeWeb-API

# 3. Instale as dependências
npm install express sequelize sqlite3 bcryptjs jsonwebtoken cors multer dotenv

# express	Framework web para construir a API
# equelize	ORM para manipulação do banco de dados relacional
# sqlite3	Banco de dados (pode trocar por outro como pg, mysql2, etc)
# bcryptjs	Criptografia de senhas
# jsonwebtoken	Autenticação via JWT
# cors	Permite requisições de origens diferentes
# multer	Upload de arquivos (armazenamento local)
# dotenv	Carrega variáveis de ambiente a partir de um arquivo .env

(opcional para desenvolvimento)
npm install --save-dev nodemon
# nodemon	Reinicia o servidor automaticamente ao salvar arquivos

# 4. Configure o ambiente
touch .env
# Adicione:
# PORT=3000
# JWT_SECRET=sua_chave_secreta
# DB_STORAGE=./data/database.sqlite

# 5. Inicie a API
npm start

## 📬 Rotas Principais

Usuário
POST /users → Criar novo usuário
POST /users/login → Autenticar usuário (retorna token)
GET /users?limit=10&offset=0 → Listar usuários (JWT)
GET /users/:id → Buscar usuário por ID
PUT /users/:id → Atualizar usuário
DELETE /users/:id → Deletar usuário

Itens
GET /items?limit=10&offset=0
POST /items
PUT /items/:id
DELETE /items/:id

Tags
GET /tags
POST /tags

...

Upload
POST /upload → Upload de arquivo (form-data com campo file)
GET /uploads/nome-do-arquivo.ext → Acessar arquivo enviado

🛡️ Segurança
JWT deve ser enviado no header:
Authorization: Bearer <token>

Senhas são armazenadas com hash via bcrypt

🙋‍♂️ Autor
Feito com 💻 por Thiago Gabriel