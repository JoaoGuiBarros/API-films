import { CreateFilmUseCase } from '../src/usecases/create-film-usecase.js';

describe('CreateFilmUseCase', () => {
  let mockRepository;
  let createFilmUseCase;

  beforeEach(() => {
    mockRepository = { create: jest.fn() };
    createFilmUseCase = new CreateFilmUseCase(mockRepository);
  });

  it('deve lançar erro se faltarem campos obrigatórios', () => {
    const invalidFilm = { titulo: "Apenas Titulo" };
    expect(() => createFilmUseCase.execute(invalidFilm)).toThrow("Os campos titulo, diretor, ano e genero são obrigatórios.");
  });

  it('deve criar o filme com sucesso', () => {
    const validFilm = { titulo: "Filme", diretor: "Diretor", ano: 2020, genero: "Ação" };
    mockRepository.create.mockReturnValue({ id: 1, ...validFilm });
    
    const result = createFilmUseCase.execute(validFilm);
    expect(result).toHaveProperty('id');
    expect(mockRepository.create).toHaveBeenCalledWith(validFilm);
  });
});