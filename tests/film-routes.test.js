import app from '../src/server.js';

describe('Integração - Rotas de Filmes', () => {
  
    it('Deve deletar um filme no DELETE /api/filmes/:id', async () => {
    const res = await app.request('/api/filmes/1', {
        method: 'DELETE'
    });
    
    if (res.status !== 204) {
        const errorBody = await res.json();
        console.log('Motivo da falha no Controller:', errorBody);
    }
    
    expect(res.status).toBe(204);
    });

  it('Deve listar os filmes no GET /api/filmes', async () => {
    const res = await app.request('/api/filmes');
    expect(res.status).toBe(200);
    
    const body = await res.json();
    expect(Array.isArray(body)).toBe(true);
  });

  it('Deve retornar status ok na rota raiz GET /', async () => {
    const res = await app.request('/');
    expect(res.status).toBe(200);
    
    const body = await res.json();
    expect(body).toEqual({
      status: 'ok',
      message: 'API Films rodando'
    });
  });
  it('Deve criar um filme no POST /api/filmes', async () => {
    const novoFilme = {
      titulo: 'Matrix',
      diretor: 'Lana Wachowski',
      ano: 1999,
      genero: 'Ação'
    };

    const res = await app.request('/api/filmes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(novoFilme)
    });

    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body).toHaveProperty('id');
    expect(body.titulo).toBe('Matrix');
  });
});