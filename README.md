# Jitterbit Order API

Uma API RESTful robusta desenvolvida em **NestJS** para o gerenciamento de pedidos e itens, cumprindo os requisitos de transformação de dados (payloads em Português para persistência em Inglês) e adicionando camadas de segurança com autenticação JWT.

## 🚀 Tecnologias e Arquitetura

Este projeto foi desenhado com foco em escalabilidade, tipagem estrita e código limpo.

* **Framework:** NestJS (Node.js) com TypeScript.
* **Banco de Dados:** PostgreSQL.
* **ORM:** Prisma ORM, garantindo *type-safety* de ponta a ponta.
* **Autenticação:** Módulo customizado com JWT (JSON Web Token) e *hashing* nativo com Bcrypt.
* **Infraestrutura:** Suporte dual-connection (Nuvem via Neon.tech ou Local via Docker).
* **Documentação:** Swagger (OpenAPI) gerado automaticamente.

## ⚙️ Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js (versão 18 ou superior)
* Docker e Docker Compose (Apenas se optar por rodar o banco localmente)

### Passo a Passo

**1. Clone o repositório e instale as dependências:**
```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd jitterbit-order-api
npm install
```

**2. Configuração do Ambiente:**

Crie o seu arquivo .env copiando o modelo de exemplo:
```bash
cp .env.example .env
```

**3. Conexão com o Banco de Dados (Escolha UMA das opções):**

A infraestrutura foi pensada para a melhor experiência do avaliador.

* 👉 Opção A (Recomendada / Nuvem): Utilize a DATABASE_URL do Neon fornecida junto com a entrega deste teste. Cole-a no seu .env. Não é necessário instalar ou rodar nenhum banco na sua máquina.
* 👉 Opção B (Docker / Local): Se preferir rodar em um ambiente totalmente isolado, o projeto conta com um container configurado. Basta rodar:
```bash
docker-compose up -d
```
*(Nota: Se usar esta opção, garanta que a DATABASE_URL do seu .env está apontando para o localhost, conforme indicado no arquivo .env.example).*

**4. Migrações e Tipagem (Obrigatório):**

Independentemente da opção escolhida no passo anterior (especialmente na Opção B, onde o banco nasce totalmente vazio), é estritamente necessário criar as tabelas e gerar os tipos do Prisma Client:
```bash
npx prisma migrate dev
npx prisma generate
```

**5. Inicie o servidor:**
```bash
npm run start:dev
```

## 📖 Como Testar a API (Swagger & Autenticação)

A documentação interativa da API estará disponível em:

👉 http://localhost:3000/api/docs

**Fluxo de Autenticação (JWT):**

Todas as rotas de gerenciamento de pedidos (/order) estão protegidas pelo JwtAuthGuard. Para testá-las via Swagger:

1. Utilize a rota POST /auth/register para criar um usuário de teste.

2. Utilize a rota POST /auth/login com as mesmas credenciais para obter o seu access_token.

3. Suba até o topo da página do Swagger, clique no botão "Authorize" (ícone de cadeado), cole o token gerado e confirme. Todas as rotas estarão prontas para receber requisições.

## 🧠 Decisões Arquiteturais Relevantes

### 1. A Escolha do Stack (NestJS + TypeScript + Prisma)
* **NestJS:** Adotado pela sua arquitetura opinativa (baseada em Módulos, Controladores e Serviços) e injeção de dependências nativa. Isso garante que a aplicação já nasça com princípios SOLID e pronta para escalar de forma sustentável, evitando o "código espaguete" comum em APIs feitas com Express puro.
* **TypeScript:** Escolha inegociável para garantir tipagem estrita de ponta a ponta. Ele atua como a nossa primeira linha de defesa, validando os contratos de dados em tempo de compilação e melhorando drasticamente a experiência de desenvolvimento e manutenção.
* **Prisma ORM:** Selecionado pela sua integração perfeita com o TypeScript e por proporcionar consultas ao banco de dados 100% *type-safe*. Ele elimina a necessidade de sincronizar manualmente as classes do código com as tabelas do banco, além de oferecer um sistema de migrações extremamente legível.

### 2. Padrões de Projeto e Regras de Negócio
* **Transformação de Dados (DTOs e Mappers):** A conversão das chaves do JSON de entrada em Português (ex: `numeroPedido`, `valorTotal`) para o padrão da base de dados em Inglês (`orderId`, `value`) foi centralizada na camada de Serviço. O Controlador se preocupa apenas com o tráfego HTTP, respeitando o princípio de Responsabilidade Única (SRP).
* **Segurança Fail-Fast:** A aplicação utiliza o `ConfigModule` de forma rigorosa. Se a variável `JWT_SECRET` não for fornecida no ambiente, a aplicação recusa-se a iniciar (lançando uma exceção), prevenindo que a API suba com vulnerabilidades em produção.
* **Endpoints Fiéis ao Contrato:** As rotas foram ajustadas propositalmente para o singular (`/order`, `/order/list`) de modo a respeitarem estritamente os exemplos de URL especificados no PDF do desafio.