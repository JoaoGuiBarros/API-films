import { Hono } from 'hono';
import { FilmRepository } from '../repositories/film-repository.js';
import { ListFilmsUseCase } from '../usecases/list-films-usecase.js';
import { FilmController } from '../controllers/film-controller.js';

const filmRoutes = new Hono();

const filmRepository = new FilmRepository();
const listFilmsUseCase = new ListFilmsUseCase(filmRepository);
const filmController = new FilmController(listFilmsUseCase);

filmRoutes.get('/filmes', (c) => filmController.list(c));

export { filmRoutes };
