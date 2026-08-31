import { mockFilms } from '../data/mock-films.js';
import { Film } from '../domain/entities/film.js';

export class FilmRepository {
  constructor(dataSource = mockFilms) {
    this.dataSource = dataSource;
  }

  async findAll() {
    return this.dataSource.map(item => new Film(item));
  }
}
