import { Hono } from 'hono';
import { filmRoutes } from '../src/routes/film-routes.js';

describe('Integração - Rotas de Filmes', () => {
  let app;

  beforeAll(() => {
    app = new Hono();
    app.route('/api', filmRoutes); 
  });

  it('Deve listar os filmes no GET /api/filmes', async () => {
    const res = await app.request('/api/filmes');
    expect(res.status).toBe(200);
    
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });

  it('Deve deletar um filme no DELETE /api/filmes/:id', async () => {
    const res = await app.request('/api/filmes/1', {
      method: 'DELETE'
    });
    expect(res.status).toBe(204);
  });
});