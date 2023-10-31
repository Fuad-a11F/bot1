export const setCommands = (bot) => {
  bot.setMyCommands([
    { command: "/start", description: "Стартовать" },
    { command: "/new_game", description: "Начать новую игру" },
    { command: "/rules", description: "Правила" },
    { command: "/my_statistic", description: "Моя статистика" },
  ]);
};
