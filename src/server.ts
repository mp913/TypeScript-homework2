import express from "express";
import initGameRouter from "./initGameRouter";
import initUserRouter from "./initUserRouter";
import initStaticFileRouter from "./initStaticFileRouter";
import InMemoryGameStorage from "./InMemoryGameStorage";
import InMemoryUserStorage from  "./InMemoryUserStorage";

const app = express();

const gameStorage = new InMemoryGameStorage();
const userStorage = new InMemoryUserStorage();

app.use(initGameRouter(gameStorage, userStorage));
app.use(initUserRouter(gameStorage, userStorage));
app.use(initStaticFileRouter());

app.listen(3000, () => {
  console.log("Express started on port 3000.");
});
