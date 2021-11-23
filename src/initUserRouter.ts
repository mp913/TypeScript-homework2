import express, { Router } from "express";
import InMemoryGameStorage from "./InMemoryGameStorage";
import InMemoryUserStorage from "./InMemoryUserStorage";

const initUserRouter = (gameStorage: InMemoryGameStorage, userStorage: InMemoryUserStorage) => {
  const router: Router = express.Router();
    
  router.use(express.json());

  router.get("/users/:id", function (request, response) {
    const id = parseInt(request.params.id);
    const user = userStorage.get(id);
    if (user) {
      response.json({ id: user?.id, name: user?.name });
    } else {
      response.status(404);
      response.send();
    }
  });

  router.post("/users", function (request, response) {
    let data = request.body;
    const user = userStorage.add({ id: 0, name: data.name, gameRecords: [] });
    response.json({ id: user.id });
  });

  router.put("/users/:id", function (request, response) {
    const id = parseInt(request.params.id);
    const data = request.body;
    const user = userStorage.get(id);
    if (user) {
      userStorage.update({ ...user, id: id, name: data.name });
    }
    response.send();
  });

  router.delete("/users/:id", function (request, response) {
    const id = parseInt(request.params.id);
    userStorage.delete(id);
    response.send();
  });

  router.get("users/:id/games", function (request, response) {
    const id = parseInt(request.params.id);
    const user = userStorage.get(id);
    if (user) {
      response.json({
        games: user.gameRecords
          .filter((gameRecord) => !gameRecord.hidden)
          .map((gameRecord) => ({ game: gameStorage.get(gameRecord.gameId), playTimeInMinutes: gameRecord.playTimeInMinutes })),
      });
    } else {
      response.status(404);
      response.send();
    }
  });

  router.post("users/:id/games", function (request, response) {
    const id = parseInt(request.params.id);
    const data = request.body;
    const user = userStorage.get(id);
    if (user) {
      const gameRecord = user.gameRecords.find((gameRecord) => gameRecord.gameId == data.gameId);
      if (gameRecord) {
        gameRecord.hidden = false;
      } else {
        user.gameRecords = [...user.gameRecords, { ...data, playTimeInMinutes: 0, hidden: false }];
      }
      userStorage.update(user);
    } else {
      response.status(404);
      response.send();
    }
  });

  router.post("users/:id/games/:gameId", function (request, response) {
    const id = parseInt(request.params.id);
    const gameId = parseInt(request.params.gameId);
    const data = request.body;
    const user = userStorage.get(id);
    if (user) {
      user.gameRecords = user.gameRecords.map((gameRecord) =>
        gameRecord.gameId == gameId ? { ...gameRecord, playTimeInMinutes: gameRecord.playTimeInMinutes + data.playTimeInMinutes } : gameRecord
      );
      userStorage.update(user);
    } else {
      response.status(404);
      response.send();
    }
  });

  router.delete("users/:id/games/:gameId", function (request, response) {
    const id = parseInt(request.params.id);
    const gameId = parseInt(request.params.gameId);
    const user = userStorage.get(id);
    if (user) {
      user.gameRecords = user.gameRecords.map((gameRecord) => (gameRecord.gameId == gameId ? { ...gameRecord, hidden: true } : gameRecord));
      userStorage.update(user);
    } else {
      response.status(404);
      response.send();
    }
  });

  return router;
}

export default initUserRouter;
  