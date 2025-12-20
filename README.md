# 🏋️‍♂️ MyTrain — Plataforma de Treinos Interativos

**MyTrain** é uma plataforma de treinos interativos com vídeos, sistema de pontuação e ranking, desenvolvida para incentivar disciplina, consistência e motivação nos exercícios físicos.

---

## 🎯 Funcionalidades

### 🎬 Modal de Vídeo com Controles
- ▶️ **Play / Pause** — Controle de reprodução dos vídeos de treino  
- 🔄 **Reiniciar** — Recomeçar o exercício atual  
- ⏭️ **Próximo / Anterior** — Navegação entre exercícios  
- ✅ **Finalizar Treino** — Concluir sessão e salvar progresso  

---

### 🏆 Sistema de Pontuação
- 🔥 **Fogo** — Indicador de consistência nos treinos  
- 🪙 **Moedas** — Recompensa por conclusão de exercícios  
- ⭐ **XP** — Experiência acumulada ao completar treinos  
- 🥇 **Ranking Dinâmico** — Medalhas para os melhores usuários  

---

### 🎨 Interface e Usabilidade
- 🌙 **Modo Escuro** — Conforto visual  
- ♿ **Modo Acessibilidade** — Melhor experiência para todos  
- 📱 **Design Responsivo** — Adaptado para desktop e mobile  
- 🚪 **Botão de Saída** — Retorno seguro à tela de login  

---

## 📁 Estrutura do Projeto

mytrain/
│
├── index.html # Tela de login
├── principal.html # Tela principal de treinos
│
├── Principal/
│ ├── principal.css # Estilos principais
│ └── principal.js # Lógica de treino e integração
│
├── server.js # Servidor Node.js / Express
└── README.md # Documentação do projeto


---


---

## 🚀 Como Rodar o Projeto

### 🔽 Clonar o Repositório
```bash
git clone https://github.com/SergioRicardoN/mytrain.git
cd mytrain

📦 Instalar o Node.js

Se ainda não tiver, baixe a versão LTS em:
👉 https://nodejs.org

📥 Instalar Dependências

Inicializar o projeto (se necessário):
npm init -y

Instalar o Express:
npm install express

Opcional — Banco de Dados MySQL:
npm install mysql2

Opcional — Desenvolvimento com recarga automática:
npm install -g nodemon

⚙️ Configurar Variáveis (se usar banco)

No arquivo server.js, ajuste as configurações do MySQL:

const dbConfig = {
  host: 'localhost',
  user: 'seu_usuario',
  password: 'sua_senha',
  database: 'mytrain'
};

▶️ Iniciar o Servidor

Método padrão:

node server.js

Ou com recarga automática (nodemon):

nodemon server.js

🌐 Acessar a Aplicação

Abra o navegador e acesse:
http://localhost:3000/

🎮 Demonstração da Interface
HUD Overlay no Vídeo

Nome do exercício em execução

Série atual sendo realizada

Botão "Sair" na barra superior para retornar ao login

Barra de Navegação Inferior

🏠 Principal — Tela inicial de treinos

🎥 Vídeos — Biblioteca de exercícios

🏆 Ranking — Classificação dos usuários

📄 PDF — Materiais de apoio

⚙️ Configurações — Personalização do sistema

sistema

💻 Tecnologias Utilizadas

Backend: Node.js, Express

Frontend: HTML5, CSS3, JavaScript (ES6+)

Banco de Dados: MySQL (Opcional)

APIs: YouTube IFrame API

Gerenciamento: npm

✅ Requisitos para Funcionamento
Obrigatórios

Node.js instalado e disponível no PATH

Dependência express instalada

Porta 3000 livre

Opcionais (se usar banco)

MySQL Server instalado e rodando

Banco mytrain criado

Usuário e senha configurados no server.js

Pacote mysql2 instalado

📂 Configuração de Arquivos Estáticos

Certifique-se que o server.js esteja servindo arquivos estáticos:

app.use(express.static('caminho_da_pasta')); 
// Exemplo: 'public' ou '.'

👤 Autor

Sergio Ricardo
Desenvolvedor do projeto
📍 Jaboatão dos Guararapes - PE, Brasil

📄 Licença

Este projeto está sob a licença MIT.
Sinta-se livre para usar, modificar e compartilhar.
