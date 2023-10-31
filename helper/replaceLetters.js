import gameOperations from "../models/gameOperations.js";

export const replaceLetters = async (login, letter) => {
  const word = await gameOperations.getWordAndLetters(login, letter);
  const letterInUse = word.letters.split("");

  const letters = word.word.split("");

  for (let i = 0; i < letters.length; i++) {
    if (letterInUse.includes(letters[i] && letter === letters[i])) {
      letters[i] = letter;
    } else {
      if (!letterInUse.includes(letters[i])) {
        letters[i] = "-";
      }
    }
  }

  await gameOperations.saveUserWord(login, letters.join(""));

  if (letters.join("") === word.word) {
    gameOperations.gameWin(login);
    return letters.join("") + ". Поздравляю. Вы выиграли!";
  }

  return letters.join("");
};
