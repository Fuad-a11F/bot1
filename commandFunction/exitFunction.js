import gameOperations from "../models/gameOperations.js";

export const exitFunction = (bot, chatId, login) => {
  gameOperations.exitGame(login);

  bot.sendMessage(chatId, "Игра окончена. Вы проиграли!");
};
