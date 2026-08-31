export class ListFilmsUseCase {
  constructor(filmRepository) {
    this.filmRepository = filmRepository;
  }

  async execute() {
    return await this.filmRepository.findAll();
  }
}
