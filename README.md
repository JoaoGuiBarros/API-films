# API Films

API REST simples desenvolvida com Hono sobre Node.js.

## Como rodar

```bash
npm install
npm start
```

Modo dev:
```bash
npm run dev
```

Servidor: `http://localhost:8080`

## Rotas

### GET /api/filmes
Retorna a lista de filmes.

Exemplo de chamada:
```bash
curl http://localhost:8080/api/filmes
```
## Workflow de Versionamento

  O workflow adotado no projeto é o Gitflow, utilizando as branches feature, dev, stage e main.

  O fluxo funciona da seguinte forma:

  1. Novas funcionalidades são desenvolvidas em branches próprias (como feature/post-films).
  2. O código finalizado é integrado na branch dev.
  3. As alterações são enviadas para a branch stage para testes e validação.
  4. O código validado é mesclado na branch main (produção) por meio de Pull Request.

  A escolha desse modelo se deve à organização do ciclo de entrega. Ele garante que a branch main permaneça sempre
  estável, separando o desenvolvimento diário, o ambiente de testes e a versão final do sistema
