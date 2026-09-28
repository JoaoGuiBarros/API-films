export class DeleteFilmUseCase {
  constructor(filmRepository) {
    this.filmRepository = filmRepository;
  }

  execute(filmId) {
    if (!filmId) {
      throw new Error('O ID do filme é obrigatório.');
    }

    this.filmRepository.delete(filmId);
  }
}
