import { replaceLetters } from "../helper/replaceLetters.js";
import GameOperations from "../models/gameOperations.js";

export const sayLetterFunction = async (bot, chatId, text, login) => {
  const isExistLetter = await GameOperations.existLetter(login, text);
  const isExistLetterInWord = await GameOperations.existLetterInWord(
    login,
    text,
  );
  const gameIsProcessing = await GameOperations.gameIsProcessing(login);
  const countLast = await GameOperations.getCount(login);

  if (gameIsProcessing?.isProcessing) {
    if (text.length === 1) {
      if (!isExistLetter?.letters) {
        GameOperations.addLetter(login, text);

        if (isExistLetterInWord) {
          const result = await replaceLetters(login, text);
          await bot.sendMessage(chatId, result);
        } else {
          if (countLast?.count <= 0) {
            await bot.sendMessage(chatId, "Вы проиграли. Игра окончена");
            await GameOperations.exitGame(login);
          } else {
            await GameOperations.minusCount(login);

            await bot.sendMessage(
              chatId,
              `Такой буквы нет в слове! У вас осталось ${
                countLast?.count - 1
              } попыток`,
            );
          }
        }
      } else {
        await bot.sendMessage(chatId, "Вы уже называли эту букву!");
      }
    } else {
      await bot.sendMessage(chatId, "Необходимо ввести только 1 букву!");
    }
  } else {
    await bot.sendMessage(chatId, "Команда неизвестна!");
  }
};
