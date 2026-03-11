🚀 ConectaPro
<p align="center"> <img src="https://img.shields.io/badge/status-em%20desenvolvimento-orange"> <img src="https://img.shields.io/badge/license-MIT-blue"> <img src="https://img.shields.io/badge/node.js-backend-green"> <img src="https://img.shields.io/badge/react-frontend-61dafb"> <img src="https://img.shields.io/badge/prisma-orm-blueviolet"> </p> <p align="center"> Plataforma que conecta <strong>profissionais e clientes</strong>, facilitando a busca, contratação e gestão de serviços. </p>
📌 Sobre o Projeto

O ConectaPro é uma plataforma digital desenvolvida para conectar prestadores de serviço a clientes que precisam desses serviços, criando um ambiente onde é possível:

Encontrar profissionais qualificados

Publicar serviços ou demandas

Enviar propostas

Criar conexões profissionais

Gerenciar oportunidades de trabalho

A proposta é criar uma experiência similar a um LinkedIn + Marketplace de serviços, focado em conexões entre pessoas e empresas.

🎯 Problema que o sistema resolve

Muitas pessoas têm dificuldade em:

Encontrar profissionais confiáveis

Divulgar seus serviços

Receber oportunidades de trabalho

Gerenciar contatos profissionais

O ConectaPro resolve isso criando um ecossistema de conexões profissionais, facilitando a comunicação entre quem oferece serviços e quem precisa deles.

👥 Público-alvo

Profissionais autônomos

Prestadores de serviço

Pequenas empresas

Pessoas que procuram serviços especializados

⚙️ Tecnologias Utilizadas
🖥️ Backend

Node.js

Express

Prisma ORM

PostgreSQL

TypeScript

JWT Authentication

🌐 Frontend

React

Vite

TailwindCSS

🛠️ Ferramentas

Git

GitHub

REST API

Docker (opcional)

🧱 Arquitetura do Projeto
ConectaPro
│
├── backend
│   ├── controllers
│   ├── services
│   ├── routes
│   ├── middlewares
│   └── prisma
│
├── frontend
│   ├── components
│   ├── pages
│   ├── hooks
│   └── services
│
└── docs

O projeto segue uma arquitetura baseada em:

Controller → Service → Database

Separação entre frontend e backend

Estrutura escalável para crescimento da aplicação

✨ Funcionalidades
👤 Usuários

Cadastro e login

Perfil profissional

Edição de informações

🔗 Conexões

Enviar solicitações de conexão

Aceitar ou recusar conexões

📢 Serviços

Criar serviços

Buscar serviços

Visualizar detalhes

💰 Propostas

Enviar propostas para serviços

Visualizar propostas recebidas

🚀 Como Rodar o Projeto
1️⃣ Clonar o repositório
git clone https://github.com/DarwinGAZ/ConectaPro.git
2️⃣ Entrar na pasta
cd ConectaPro
3️⃣ Instalar dependências

Backend

cd backend
npm install

Frontend

cd frontend
npm install
4️⃣ Configurar variáveis de ambiente

Crie um arquivo .env:

DATABASE_URL="postgresql://user:password@localhost:5432/conectapro"
JWT_SECRET="secret"
5️⃣ Rodar as migrations do Prisma
npx prisma migrate dev
6️⃣ Iniciar o servidor

Backend

npm run dev

Frontend

npm run dev
📡 API Endpoints (exemplo)
Usuários
POST /users
GET /users/:id
PUT /users/:id
Serviços
POST /services
GET /services
GET /services/:id
Propostas
POST /proposals
GET /services/:id/proposals
📷 Preview do Projeto

(Adicione aqui prints do sistema quando tiver interface pronta)

/docs/screenshots
📌 Roadmap

 Estrutura inicial do backend

 Sistema de usuários

 Sistema de serviços

 Sistema de propostas

 Sistema de conexões

 Chat entre usuários

 Notificações

 Deploy da aplicação

🤝 Contribuição

Contribuições são bem-vindas!

Faça um fork do projeto

Crie uma branch

git checkout -b minha-feature

Commit

git commit -m "feat: nova funcionalidade"

Push

git push origin minha-feature

Abra um Pull Request

📄 Licença

Este projeto está sob a licença MIT.

👨‍💻 Autor

Darwin GAZ

GitHub: https://github.com/DarwinGAZ

Projeto: https://github.com/DarwinGAZ/ConectaPro

💡 ConectaPro — conectando profissionais às oportunidades certas.
