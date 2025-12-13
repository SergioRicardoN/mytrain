# 🏋️‍♂️ MyTrain — Sistema de Treinos Personalizados

**MyTrain** é um sistema de cadastro de usuários focado em treinos personalizados. Cada usuário define seu nível de experiência e objetivo físico, permitindo uma base para criação de planos de treino no futuro.

O projeto foi desenvolvido com **Node.js**, **Express**, **Sequelize** e **MySQL**, com o objetivo principal de aprendizado em backend, banco de dados e organização de projetos.

---

## 🚀 Funcionalidades

* 👤 Cadastro de usuários (nome, e-mail e senha)
* 🔐 Login básico com validação
* 📊 Definição do nível de treino (iniciante, intermediário, avançado)
* 🎯 Escolha do objetivo físico (emagrecimento, hipertrofia, resistência)
* 🗃️ Persistência de dados em banco MySQL
* 🧱 Arquitetura modular utilizando Sequelize (ORM)

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Finalidade                                 |
| ---------- | ------------------------------------------ |
| Node.js    | Ambiente de execução JavaScript            |
| Express    | Framework para criação do servidor e rotas |
| Sequelize  | ORM para comunicação com o MySQL           |
| MySQL      | Banco de dados relacional                  |
| HTML/CSS   | Interface básica do sistema                |

---

## 📁 Estrutura do Projeto

```text
mytrain/
├── config/                 # Configuração do banco de dados
│   └── trainbanco.js
├── models/                 # Models Sequelize
│   ├── usuario.js
│   ├── nivel.js
│   └── objetivo.js
├── public/                 # Arquivos estáticos (HTML)
│   ├── index.html
│   ├── dashboard.html
│   ├── erro-login.html
│   ├── selecao.html
│   └── objetivo.html
├── server.js               # Servidor Express
├── package.json            # Dependências do projeto
└── .gitignore
```

---

## 💻 Como Rodar o Projeto Localmente

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/SergioRicardoN/mytrain.git
cd mytrain
```

### 2️⃣ Instale as dependências

```bash
npm install
```

### 3️⃣ Configure o banco de dados

No arquivo:

```text
config/trainbanco.js
```

Configure:

* Usuário do MySQL
* Senha
* Nome do banco de dados

Certifique-se de que o MySQL esteja rodando.

### 4️⃣ Execute o servidor

```bash
node server.js
```

### 5️⃣ Acesse no navegador

```text
http://localhost:3000
```

---

## 📌 Observações

* Este projeto tem fins **educacionais**.
* Não utiliza criptografia avançada de senhas (não recomendado para produção).
* Ideal para estudos de **Node.js + MySQL + Sequelize**.

---

## 👨‍💻 Autor

Desenvolvido por **Sergio Ricardo** 🚀

Projeto criado para aprendizado em backend e banco de dados.
