import UserOperations from "../models/userOperations.js";

export const startFunction = (bot, chatId, login) => {
  UserOperations.postUser(login);

  bot.sendMessage(
    chatId,
    "Это бот, с которым ты можешь играть в поле чудес! Начинай новую игру скорее!",
  );
};
