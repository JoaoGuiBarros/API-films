export class FilmController {
  constructor(listFilmsUseCase, createFilmUseCase) {
    this.listFilmsUseCase = listFilmsUseCase;
    this.createFilmUseCase = createFilmUseCase;
  }

  async list(c) {
    try {
      const films = await this.listFilmsUseCase.execute();
      return c.json(films, 200);
    } catch (error) {
      return c.json({ error: error.message }, 500);
    }
  }

  async create(c) {
    try {
      const body = await c.req.json();
      const novoFilme = this.createFilmUseCase.execute(body);
      return c.json(novoFilme, 201); 
    } catch (error) {
      return c.json({ error: error.message }, 400); 
    }
  }
}
