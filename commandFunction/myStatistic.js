import gameOperations from "../models/gameOperations.js";

export const myStatistic = async (bot, chatId, login) => {
  const statisticWin = await gameOperations.statisticWin(login);
  const statisticLose = await gameOperations.statisticLose(login);

  const result = `
Логин: ${login} (вы)
Побед: ${statisticWin?.win}
Поражений: ${statisticLose?.lose}
  `;

  bot.sendMessage(chatId, result);
};
