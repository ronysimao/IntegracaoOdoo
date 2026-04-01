# Odoo JSON API

Exemplo de API NestJS para consulta de recursos do Odoo via JSON.

Esse exemplo mostra como utilizar a API Json-API-2 do Odoo para obter informações diretamente do Odoo.

A documentação do Odoo está disponível em [External JSON-2 API](https://www.odoo.com/documentation/19.0/developer/reference/external_api.html).

## Requisitos

- Node.js
- Postman
- nvm (opcional, recomendado para usar a versão do `.nvmrc`)

## Como gerar uma chave de API no Odoo

1. Acesse o Odoo e faça login normalmente.
2. Clique na foto do seu perfil, no canto superior direito.
3. Clique em `My preferences`.
4. No modal de preferências, abra a aba `Segurança`.
5. Na seção `Chaves de API`, clique em `Add API Key`.
6. Confirme sua senha de usuário, se solicitado.
7. Informe um nome para a chave, selecione o período de duração e clique em `Gerar chave`.
8. Copie o valor gerado e preencha a variável de ambiente `ODOO_JSON_2_API_KEY`.

## Como executar

Antes de iniciar a API, copie o arquivo de exemplo de ambiente e ajuste sua chave:

```bash
cp .env.example .env
```

Em seguida, edite o `.env` e preencha a variável `ODOO_JSON_2_API_KEY` com a sua chave de API do Odoo.

Se você tiver `nvm` instalado, execute antes para usar a mesma versão de Node do projeto:

```bash
nvm use
```

```bash
npm install
npm start:dev
```

Caso a porta 3000 esteja em execução, configurar a variável de ambiente `PORT` no arquivo `.env`

## Documentação Swagger

Com a API em execução, acesse:

- Swagger UI: `http://localhost:3000/docs`
- OpenAPI JSON: `http://localhost:3000/docs-json`

## Como importar no Postman

1. Abra o Postman.
2. Vá em `Collections` -> `Import`.
3. Selecione a opção de importação por URL.
4. Cole `http://localhost:3000/docs-json`.
5. Clique em `View Import Settings`.
6. Desmarque a opção `Enable optional parameters`.
7. Conclua a importação.

Depois, crie um `Environment` no Postman com:

- `baseUrl = http://localhost:3000`

## Rotas por grupo

| Grupo      | Rotas                                                                                                | Descrição                                                       |
| ---------- | ---------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Auth       | `POST /odoo/authenticate`                                                                            | Autentica no Odoo via JSON-RPC usando base, login e senha.      |
| Projects   | `GET /odoo/projects`<br>`GET /odoo/projects/:id`                                                     | Lista projetos e consulta projeto específico por ID.            |
| Tasks      | `GET /odoo/tasks`<br>`GET /odoo/tasks/:id`<br>`GET /odoo/task-stages`<br>`GET /odoo/task-stages/:id` | Lista/consulta tarefas e etapas de tarefas.                     |
| Timesheets | `GET /odoo/timesheets`<br>`GET /odoo/timesheets/:id`                                                 | Lista apontamentos de horas e consulta um apontamento por ID.   |
| Planning   | `GET /odoo/planning-slots`<br>`GET /odoo/planning-slots/:id`                                        | Lista e consulta slots de planejamento por ID.                  |
| Employees  | `GET /odoo/employees`<br>`GET /odoo/employees/:id`                                                   | Lista colaboradores e consulta colaborador por ID.              |
| Metadata   | `GET /odoo/metadata/models/:model/fields`                                                            | Lista metadados de campos de um modelo técnico do Odoo.         |
