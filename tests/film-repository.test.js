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

  it('deve deletar um filme existente', () => {
    const fakeDataSource = [
      { id: 1, titulo: "Teste 1" },
      { id: 2, titulo: "Teste 2" }
    ];

    const repository = new FilmRepository(fakeDataSource);

    repository.delete(1);

    expect(fakeDataSource).toHaveLength(1);
    expect(fakeDataSource[0].id).toBe(2);
  });

  it('Deve lançar um erro ao tentar deletar um filme que não existe', () => {
    const fakeDataSource = [
      { id: 1, titulo: "Teste 1" }
    ];
    const repository = new FilmRepository(fakeDataSource);

    expect(() => repository.delete(2)).toThrow('Filme com ID 2 não encontrado.');
  });
});