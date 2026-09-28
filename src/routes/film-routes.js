import { Hono } from 'hono';
import { FilmRepository } from '../repositories/film-repository.js';
import { ListFilmsUseCase } from '../usecases/list-films-usecase.js';
import { CreateFilmUseCase } from '../usecases/create-film-usecase.js';
import { FilmController } from '../controllers/film-controller.js';
import { DeleteFilmUseCase } from "../usecases/delete-film-usecase.js";

const filmRoutes = new Hono();

const filmRepository = new FilmRepository();
const listFilmsUseCase = new ListFilmsUseCase(filmRepository);
const createFilmUseCase = new CreateFilmUseCase(filmRepository);
const deleteFilmUseCase = new DeleteFilmUseCase(filmRepository);

const filmController = new FilmController(listFilmsUseCase, createFilmUseCase, deleteFilmUseCase);

filmRoutes.get('/filmes', (c) => filmController.list(c));

filmRoutes.post('/filmes', (c) => filmController.create(c));

filmRoutes.delete('/filmes/:id', (c) => filmController.delete(c));

export { filmRoutes };
