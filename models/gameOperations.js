import sqlite3 from "sqlite3";

const sqllite = sqlite3.verbose();
const db = new sqllite.Database("./db");

class GameOperations {
  exitGame(login) {
    db.run("UPDATE game SET isProcessing = 0 WHERE login = ?", [login]);
  }

  async statisticWin(login) {
    return await new Promise((resolve, reject) => {
      db.get(
        "SELECT count(*) as win FROM game WHERE login = ? and win = 1",
        [login],
        (err, row) => {
          if (err) reject(err);
          resolve(row);
        },
      );
    });
  }

  async statisticLose(login) {
    return await new Promise((resolve, reject) => {
      db.get(
        "SELECT count(*) as lose FROM game WHERE login = ? and win = 0",
        [login],
        (err, row) => {
          if (err) reject(err);
          resolve(row);
        },
      );
    });
  }

  startGame(login, word, description) {
    db.serialize(() => {
      db.run("UPDATE game SET isProcessing = 0 WHERE login = ?", [login]);

      db.run("INSERT INTO game (login, word, description) VALUES(?, ?, ?)", [
        login,
        word,
        description,
      ]);
    });
  }

  async existLetter(login, letter) {
    return await new Promise((resolve, reject) => {
      db.get(
        "SELECT letters FROM game WHERE instr(game.letters, ?) and login = ? and isProcessing = 1",
        [letter, login],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        },
      );
    });
  }

  saveUserWord(login, word) {
    db.run(
      "UPDATE game SET userWord = ? WHERE login = ? and isProcessing = 1",
      [word, login],
    );
  }

  gameWin(login) {
    db.run(
      "UPDATE game SET win = 1, isProcessing = 0 WHERE login = ? and isProcessing = 1",
      [login],
    );
  }

  async getWordAndLetters(login, letter) {
    return await new Promise((resolve, reject) => {
      db.get(
        "SELECT word, letters FROM game WHERE instr(game.letters, ?) and login = ? and isProcessing = 1",
        [letter, login],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        },
      );
    });
  }

  async existLetterInWord(login, letter) {
    return await new Promise((resolve, reject) => {
      db.get(
        "SELECT word FROM game WHERE instr(game.word, ?) and login = ? and isProcessing = 1",
        [letter, login],
        (err, rows) => {
          if (err) reject(err);
          resolve(rows);
        },
      );
    });
  }

  addLetter(login, letter) {
    db.run(
      "UPDATE game SET letters = letters || ? WHERE login = ? and isProcessing = 1",
      [letter, login],
    );
  }

  minusCount(login) {
    db.run(
      "UPDATE game SET count = count - 1 WHERE login = ? and isProcessing = 1",
      [login],
    );
  }

  async getCount(login) {
    return await new Promise((resolve) => {
      db.get(
        "SELECT count from game WHERE login = ? and isProcessing = 1",
        [login],
        (err, row) => {
          resolve(row);
        },
      );
    });
  }

  async gameIsProcessing(login) {
    return await new Promise((resolve, reject) => {
      db.get(
        "SELECT isProcessing from game WHERE login = ? and isProcessing = 1",
        [login],
        (err, rows) => {
          resolve(rows);
        },
      );
    });
  }
}

export default new GameOperations();
