import { mockFilms } from '../data/mock-films.js';
import { Film } from '../domain/entities/film.js';

export class FilmRepository {
  constructor(dataSource = mockFilms) {
    this.dataSource = dataSource;
  }

  async findAll() {
    return this.dataSource.map(item => new Film(item));
  }

  create(filmData) {
    const novoId = this.dataSource.length > 0 ? Math.max(...this.dataSource.map(f => f.id)) + 1 : 1;
    
    const novoFilme = {
      id: novoId,
      ...filmData
    };
    
    this.dataSource.push(novoFilme);
    return novoFilme;
  }
}
