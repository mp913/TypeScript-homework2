import { Game } from "./Game";

let nextGameId: number = 5;
let gameList: Game[] = [
  {
    id: 1,
    title: "Mirror's Edge",
    description: "In a city where information is heavily monitored, couriers called Runners transport sensitive data. In this seemingly utopian paradise, a crime has been committed, & you are being hunted. You are a Runner called Faith and this innovative first-person action-adventure is your story.",
    ageRating: "T",
    imagePaths: [
      "49c548a9fa514e75895baea2e43f3199.jpg",
      "a55ad0b913144696b101fb25b662fede.jpg",
      "559594b9d0dd421d8a4bf20caa625f86.jpg",
    ],
  },
  {
    id: 2,
    title: "Deus Ex: Game of the Year Edition",
    description: "The year is 2052 and the world is a dangerous and chaotic place. Terrorists operate openly - killing thousands; drugs, disease and pollution kill even more. The world's economies are close to collapse and the gap between the insanely wealthy and the desperately poor grows ever wider.",
    ageRating: "M",
    imagePaths: [
      "49c548a9fa514e75895baea2e43f3199.jpg",
      "a55ad0b913144696b101fb25b662fede.jpg",
      "559594b9d0dd421d8a4bf20caa625f86.jpg",
    ],
  },
  {
    id: 3,
    title: "Titanfall 2",
    description: "Respawn Entertainment gives you the most advanced titan technology in its new, single player campaign & multiplayer experience. Combine & conquer with new titans & pilots, deadlier weapons, & customization and progression systems that help you and your titan flow as one unstoppable killing force.",
    ageRating: "M",
    imagePaths: [
      "49c548a9fa514e75895baea2e43f3199.jpg",
      "a55ad0b913144696b101fb25b662fede.jpg",
      "559594b9d0dd421d8a4bf20caa625f86.jpg",
    ],
  },
  {
    id: 4,
    title: "FINAL FANTASY XIV Online",
    description: "Take part in an epic and ever-changing FINAL FANTASY as you adventure and explore with friends from around the world.",
    ageRating: "T",
    imagePaths: [
      "49c548a9fa514e75895baea2e43f3199.jpg",
      "a55ad0b913144696b101fb25b662fede.jpg",
      "559594b9d0dd421d8a4bf20caa625f86.jpg",
    ],
  },
];

export default class InMemoryGameStorage {
  getAll = () => {
    return gameList;
  };

  get = (id: number) => {
    const game = gameList.find((game) => game.id == id);
    return game ?? null;
  };

  add = (game: Game) => {
    game.id = nextGameId++;
    gameList = [...gameList, game];
    return game;
  };

  update = (game: Game) => {
    const id = game.id;
    gameList = [...gameList.filter((game) => game.id != id), game];
  };

  delete = (id: number) => {
    gameList = gameList.filter((game) => game.id != id);
  };
}
