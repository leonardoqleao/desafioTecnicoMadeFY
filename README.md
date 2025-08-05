
# Projeto Full Stack - Docker + .NET 8 + Angular

Este repositório contém uma aplicação full stack com:

- **Backend**: .NET 8 (API REST)
- **Frontend**: Angular
- **Banco de Dados**: PostgreSQL via Docker Compose

---

## 🧱 Estrutura

```

/backend      -> API .NET 8
/frontend     -> Angular
/docker       -> Arquivos do banco
/docker-compose.yml

````

---

## 🚀 Pré-requisitos

Certifique-se de ter instalado:

- [Docker e Docker Compose](https://www.docker.com/)
- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js (v18+ recomendado)](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli):  
```bash
  npm install -g @angular/cli
````

---

## 🐘 Subindo o Banco de Dados

Dentro do diretório raiz do projeto:

```bash
docker-compose up -d
```

Isso irá iniciar o banco de dados (PostgreSQL) com as configurações definidas em `docker-compose.yml`.

---

## 🔧 Rodando a API (.NET 8)

1. Vá para a pasta do backend:

   ```bash
   cd backend
   ```

2. Restaure as dependências:

   ```bash
   dotnet restore
   ```

3. Rode a API:

   ```bash
   dotnet run
   ```

4. **Executar as migrações**:
   Dentro da solução, existe uma biblioteca chamada `Infra`, responsável pela infraestrutura de dados (incluindo o `DbContext`).

   Para aplicar as migrações, execute o seguinte comando na raiz do projeto (onde está o `.sln`):

A API estará disponível em `https://localhost:5159` (ajuste conforme seu `launchSettings.json` ou configuração de HTTPS).

---

## 💻 Rodando o Frontend (Angular)

1. Vá para a pasta do frontend:

   ```bash
   cd frontend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Rode o projeto:

   ```bash
   ng serve
   ```

A aplicação estará disponível em `http://localhost:4200`.
