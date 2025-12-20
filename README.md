FUNCIONALIDADES

Modal de vídeo com controles:

Play

Pause

Reiniciar

Próximo

Anterior

Finalizar treino

Sistema de pontos:

Fogo

Moedas

XP (atualizados ao concluir treinos)

Ranking dinâmico com medalhas para os melhores usuários

Modo escuro

Modo acessibilidade

Botão de saída para retornar ao login

Design responsivo (desktop e mobile)

ESTRUTURA DO PROJETO

mytrain/ │ ├── index.html # Tela de login ├── principal.html # Tela principal de treinos ├── Principal/ │ ├── principal.css # Estilos principais │ └── principal.js # Lógica de treino e integração ├── server.js # Servidor Node/Express └── README.md # Documentação do projeto

Observação: Se o server.js serve arquivos estáticos, mantenha seus HTML, CSS e JS onde o servidor espera (por exemplo, pasta public/ se configurado).

COMO RODAR O PROJETO

Clonar o repositório: git clone https://github.com/SergioRicardoN/mytrain.git

Entrar na pasta do projeto: cd mytrain

Instalar Node.js (se ainda não tiver): Baixar em nodejs.org e instalar a versão LTS

Instalar dependências do projeto: npm init -y (se ainda não existir package.json) npm install express (se usar banco MySQL: npm install mysql2) (opcional para desenvolvimento automático: npm install -g nodemon)

Configurar variáveis de banco se necessário: No server.js, ajustar host, user, password e database do MySQL Se não usar banco ainda, comentar ou tratar blocos de conexão

Iniciar o servidor: node server.js Ou, se instalou nodemon: nodemon server.js

Acessar no navegador: http://localhost:3000/

DEMONSTRAÇÃO

HUD overlay no vídeo mostrando:

Nome do exercício

Série atual

Botão Sair na top-bar para retornar ao login

Barra de navegação inferior com atalhos para:

Principal

Vídeos

Ranking

PDF

Configurações

TECNOLOGIAS UTILIZADAS

Node.js e npm

Express (servidor web)

MySQL com mysql2

HTML5

CSS3

JavaScript (ES6)

YouTube IFrame API

REQUISITOS PARA FUNCIONAR

Node.js instalado e disponível no PATH

Dependências npm instaladas: express (se usar banco) mysql2 (opcional) nodemon

Se usar banco de dados: MySQL Server instalado e rodando Banco mytrain criado Usuário e senha configurados (evitar root em produção)

Porta 3000 livre no sistema

Arquivos estáticos acessíveis conforme configuração do server.js (ex.: app.use(express.static('public')) caso use pasta public)

AUTOR

Projeto desenvolvido por Sergio Local: Jaboatão dos Guararapes - PE, Brasil

LICENÇA

Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e compartilhar.
