import { getRandomNumber } from "../helper/getRandomNumber.js";
import { datas } from "../data.js";
import GameOperations from "../models/gameOperations.js";

export const newGameFunction = (bot, chatId, login) => {
  const randomIndex = getRandomNumber(datas.length);
  const word = datas[randomIndex][0];
  const description = datas[randomIndex][1];

  GameOperations.startGame(login, word, description);

  bot.sendMessage(chatId, `Задание: ${description}`);
};
