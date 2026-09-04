import { FilmRepository } from '../src/repositories/film-repository.js';

describe('FilmRepository', () => {
  it('deve listar todos os filmes retornando instâncias de Film', async () => {
    const fakeDataSource = [
      { id: 1, titulo: "Teste 1", diretor: "Dir 1", ano: 2000, genero: "Ação" }
    ];
    const repository = new FilmRepository(fakeDataSource);
    
    const filmes = await repository.findAll();
    
    expect(filmes).toHaveLength(1);
    expect(filmes[0].titulo).toBe("Teste 1");
  });

  it('deve criar um novo filme e gerar o próximo ID', () => {
    const fakeDataSource = [
      { id: 1, titulo: "Teste 1" }
    ];
    const repository = new FilmRepository(fakeDataSource);
    const novoFilmeData = { titulo: "Novo Filme" };
    
    const resultado = repository.create(novoFilmeData);
    
    expect(resultado.id).toBe(2);
    expect(resultado.titulo).toBe("Novo Filme");
    expect(fakeDataSource).toHaveLength(2);
  });

  it('deve criar um novo filme com ID 1 se a base estiver vazia', () => {
    const fakeDataSource = [];
    const repository = new FilmRepository(fakeDataSource);
    
    const resultado = repository.create({ titulo: "Primeiro Filme" });
    
    expect(resultado.id).toBe(1);
  });

  it('deve inicializar com mockFilms se nenhum dataSource for fornecido', async () => {
    const repository = new FilmRepository();
    const filmes = await repository.findAll();
    
    expect(filmes).toHaveLength(4);
  });
});