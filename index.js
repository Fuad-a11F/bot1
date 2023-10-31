import TelegramBot from "node-telegram-bot-api";
import config from "dotenv";
import { setCommands } from "./helper/setCommands.js";
import { CommandType } from "./const.js";
import {
  exitFunction,
  myStatistic,
  newGameFunction,
  rulesFunction,
  sayLetterFunction,
  startFunction,
} from "./commandFunction/index.js";

config.config();

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

setCommands(bot);

const start = () => {
  bot.on("message", async (msg) => {
    const text = msg.text.toLowerCase();
    const chatId = msg.chat.id;
    const login = msg.chat.username;

    if (text === CommandType.START) {
      startFunction(bot, chatId, login);
    } else if (text === CommandType.RULES) {
      rulesFunction(bot, chatId);
    } else if (text === CommandType.NEW_GAME) {
      newGameFunction(bot, chatId, login);
    } else if (text === CommandType.EXIT) {
      exitFunction(bot, chatId, login);
    } else if (text === CommandType.MY_STATISTIC) {
      await myStatistic(bot, chatId, login);
    } else {
      await sayLetterFunction(bot, chatId, text, login);
    }
  });
};

start();
