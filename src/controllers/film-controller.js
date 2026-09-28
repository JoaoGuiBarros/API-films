export class FilmController {
  constructor(listFilmsUseCase, createFilmUseCase, deleteFilmUseCase) {
    this.listFilmsUseCase = listFilmsUseCase;
    this.createFilmUseCase = createFilmUseCase;
    this.deleteFilmUseCase = deleteFilmUseCase;
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

  async delete(c) {
    try {
      const filmId = parseInt(c.req.param('id'), 10);
      await this.deleteFilmUseCase.execute(filmId);
      return c.json({}, 204);
    } catch (error) {
      return c.json({ error: error.message }, 404);
    }
  }
}
