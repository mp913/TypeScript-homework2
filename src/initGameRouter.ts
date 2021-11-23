import express, { Router } from "express";
import InMemoryGameStorage from "./InMemoryGameStorage";
import InMemoryUserStorage from "./InMemoryUserStorage";

const initGameRouter = (gameStorage: InMemoryGameStorage, userStorage: InMemoryUserStorage) => {
  const router: Router = express.Router();

  router.use(express.json());

  router.get("/games", function (request, response) {
    response.json(gameStorage.getAll());
  });

  router.get("/games/:id", function (request, response) {
    const id = parseInt(request.params.id);
    const game = gameStorage.get(id);
    if (game) {
      response.json(game);
    } else {
      response.status(404);
      response.send();
    }
  });

  router.post("/games", function (request, response) {
    let game = request.body;
    game = gameStorage.add(game);
    response.json({ id: game.id });
  });

  router.put("/games/:id", function (request, response) {
    const id = parseInt(request.params.id);
    const game = request.body;
    gameStorage.update({ ...game, id: id });
    response.send();
  });

  router.delete("/games/:id", function (request, response) {
    const id = parseInt(request.params.id);
    gameStorage.delete(id);
    userStorage.deleteRecordsForGame(id);
    response.send();
  });
  
  return router; 
}

export default initGameRouter;
