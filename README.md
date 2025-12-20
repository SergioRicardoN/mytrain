MyTrain - Plataforma de Treinos Interativos
🎯 Funcionalidades
🎬 Modal de Vídeo com Controles
Play/Pause - Controle de reprodução dos vídeos de treino

Reiniciar - Recomeçar o exercício atual

Próximo/Anterior - Navegação entre exercícios

Finalizar Treino - Concluir sessão e salvar progresso

🏆 Sistema de Pontuação
Fogo - Indicador de consistência nos treinos

Moedas - Recompensa por conclusão de exercícios

XP - Experiência acumulada ao completar treinos

Ranking Dinâmico - Medalhas para os melhores usuários

🎨 Interface e Usabilidade
Modo Escuro - Tema escuro para conforto visual

Modo Acessibilidade - Recursos para melhor experiência

Design Responsivo - Adaptado para desktop e mobile

Botão de Saída - Retorno seguro à tela de login

---------------------------------

mytrain/
│
├── index.html              # Tela de login
├── principal.html          # Tela principal de treinos
│
├── Principal/
│   ├── principal.css       # Estilos principais
│   └── principal.js        # Lógica de treino e integração
│
├── server.js              # Servidor Node/Express
└── README.md              # Documentação do projeto

--------------------------------------------------

🚀 Como Rodar o Projeto

1. Clonar o Repositório
git clone https://github.com/SergioRicardoN/mytrain.git
cd mytrain

2. Instalar Node.js
Se ainda não tiver, baixe e instale a versão LTS em nodejs.org

3. Instalar Dependências

# Inicializar projeto (se necessário)
npm init -y

# Instalar Express
npm install express

# Opcional - Banco de dados MySQL
npm install mysql2

# Opcional - Para desenvolvimento com recarga automática
npm install -g nodemon

4. Configurar Variáveis (se usar banco)
No arquivo server.js, ajuste as configurações do MySQL:

// Ajustar conforme seu ambiente
const dbConfig = {
    host: 'localhost',
    user: 'seu_usuario',
    password: 'sua_senha',
    database: 'mytrain'
};

5. Iniciar o Servidor

# Método padrão
node server.js

# Ou com recarga automática (se instalou nodemon)
nodemon server.js

6. Acessar a Aplicação
Abra seu navegador e acesse:

http://localhost:3000/


🎮 Demonstração
HUD Overlay no Vídeo
Nome do exercício em execução

Série atual sendo realizada

Botão "Sair" na barra superior para retornar ao login

Barra de Navegação Inferior
Acesso rápido às principais seções:

Principal - Tela inicial de treinos

Vídeos - Biblioteca de exercícios

Ranking - Classificação dos usuários

PDF - Materiais de apoio

Configurações - Personalização do sistema

💻 Tecnologias Utilizadas
Backend: Node.js, Express

Frontend: HTML5, CSS3, JavaScript (ES6+)

Banco de Dados: MySQL (Opcional)

APIs: YouTube IFrame API para vídeos

Gerenciamento: npm

✅ Requisitos para Funcionar
Necessários
Node.js instalado e disponível no PATH

Dependências instaladas: express

Porta 3000 livre no sistema

Opcionais (se usar banco)
MySQL Server instalado e rodando

Banco mytrain criado

Usuário e senha configurados no server.js

Pacote mysql2 instalado

Configuração de Arquivos Estáticos
Certifique-se que o server.js esteja configurado para servir arquivos estáticos:
app.use(express.static('caminho_da_pasta')); // Ex: 'public' ou '.'

👤 Autor
Sergio Ricardo
Desenvolvedor do projeto
Local: Jaboatão dos Guararapes - PE, Brasil

📄 Licença
Este projeto está sob a licença MIT. Sinta-se livre para usar, modificar e compartilhar.
