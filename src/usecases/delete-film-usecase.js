export class DeleteFilmUseCase {
  constructor(filmRepository) {
    this.filmRepository = filmRepository;
  }

  async execute(filmId) {
    if (!filmId) {
      throw new Error('O ID do filme é obrigatório.');
    }
    
    try {
      await this.filmRepository.delete(filmId);
    } catch (error) {
        throw new Error('Erro ao deletar o filme: ' + error.message);
    }
  }
}
