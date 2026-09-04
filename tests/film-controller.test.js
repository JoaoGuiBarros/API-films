import { FilmController } from '../src/controllers/film-controller.js';

describe('FilmController', () => {
  let mockListUseCase;
  let mockCreateUseCase;
  let filmController;
  let mockContext;

  beforeEach(() => {
    mockListUseCase = { execute: jest.fn() };
    mockCreateUseCase = { execute: jest.fn() };
    filmController = new FilmController(mockListUseCase, mockCreateUseCase);
    
    mockContext = {
      json: jest.fn((data, status) => ({ data, status })),
      req: {
        json: jest.fn()
      }
    };
  });

  describe('Método list()', () => {
    it('deve retornar status 200 e a lista de filmes em caso de sucesso', async () => {
      const filmes = [{ id: 1, titulo: "Matrix" }];
      mockListUseCase.execute.mockResolvedValue(filmes);

      const result = await filmController.list(mockContext);

      expect(result.status).toBe(200);
      expect(result.data).toEqual(filmes);
    });

    it('deve retornar status 500 e a mensagem de erro em caso de falha', async () => {
      mockListUseCase.execute.mockRejectedValue(new Error("Erro no banco"));

      const result = await filmController.list(mockContext);

      expect(result.status).toBe(500);
      expect(result.data).toEqual({ error: "Erro no banco" });
    });
  });

  describe('Método create()', () => {
    it('deve retornar status 201 e o filme criado em caso de sucesso', async () => {
      const bodyParams = { titulo: "Novo Filme" };
      const createdFilm = { id: 1, ...bodyParams };
      
      mockContext.req.json.mockResolvedValue(bodyParams);
      mockCreateUseCase.execute.mockReturnValue(createdFilm);

      const result = await filmController.create(mockContext);

      expect(result.status).toBe(201);
      expect(result.data).toEqual(createdFilm);
    });

    it('deve retornar status 400 em caso de erro de validação', async () => {
      mockContext.req.json.mockResolvedValue({});
      mockCreateUseCase.execute.mockImplementation(() => {
        throw new Error("Campos obrigatórios faltando");
      });

      const result = await filmController.create(mockContext);

      expect(result.status).toBe(400);
      expect(result.data).toEqual({ error: "Campos obrigatórios faltando" });
    });
  });
});