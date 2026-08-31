export class CreateFilmUseCase {
  constructor(filmRepository) {
    this.filmRepository = filmRepository;
  }

  execute(filmData) {
    if (!filmData.titulo || !filmData.diretor || !filmData.ano || !filmData.genero) {
      throw new Error("Os campos titulo, diretor, ano e genero são obrigatórios.");
    }
    
    return this.filmRepository.create(filmData);
  }
}
