export const rulesFunction = (bot, chatId) => {
  bot.sendMessage(
    chatId,
    `
  Правила игры:
1. Начинаете новую игру.
2. Читаете опсиание слова.
3. Пишите по одной букве, чтобы отгадать слово.
4. На этом пока все))
  `,
    { parse_mode: "HTML" },
  );
};
