import { ListFilmsUseCase } from '../src/usecases/list-films-usecase.js';

describe('ListFilmsUseCase', () => {
  it('deve retornar a lista de filmes do repositório', async () => {

    const mockFilms = [{ id: 1, titulo: "Filme Teste" }];
    const mockRepository = {
      findAll: jest.fn().mockResolvedValue(mockFilms)
    };
    const listFilmsUseCase = new ListFilmsUseCase(mockRepository);

    const result = await listFilmsUseCase.execute();

    expect(result).toEqual(mockFilms);
    expect(mockRepository.findAll).toHaveBeenCalledTimes(1);
  });
});