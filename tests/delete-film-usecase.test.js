import { DeleteFilmUseCase } from '../src/usecases/delete-film-usecase.js';

describe('DeleteFilmUseCase', () => {
    let mockRepository;
    let deleteFilmUseCase;

    beforeEach(() => {
        mockRepository = { delete: jest.fn() };
        deleteFilmUseCase = new DeleteFilmUseCase(mockRepository);
    });

    it('Deve lançar um erro se o ID do filme faltar', () => {
        expect(() => deleteFilmUseCase.execute()).toThrow('O ID do filme é obrigatório.');
    });

    it('Deve chamar o método delete do repositório com o ID correto', () => {
        const filmId = 1;
        deleteFilmUseCase.execute(filmId);
        expect(mockRepository.delete).toHaveBeenCalledWith(filmId);
    });
});