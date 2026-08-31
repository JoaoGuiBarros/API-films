export class FilmController {
  constructor(listFilmsUseCase) {
    this.listFilmsUseCase = listFilmsUseCase;
  }

  async list(c) {
    try {
      const films = await this.listFilmsUseCase.execute();
      return c.json(films, 200);
    } catch (error) {
      return c.json({ error: error.message }, 500);
    }
  }
}
