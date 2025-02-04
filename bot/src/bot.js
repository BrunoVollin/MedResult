const TelegramBot = require("node-telegram-bot-api");
const startCommand = require("./commands/start.command");
const loginCommand = require("./commands/login.command");
const seeResultsCommand = require("./commands/see-results.command");
const downloadCommand = require("./commands/download.command");

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => startCommand(msg, bot));
bot.onText(/\/login/, (msg) => loginCommand(msg, bot));
bot.onText(/\/results(?:(.+))?/, (msg, match) => {
  const page = match[1];
  seeResultsCommand(msg, bot, page);
});
bot.onText(/\/download(?:(.+))?/, (msg, match) => {
  const id = match[1];
  downloadCommand(msg, bot, id);
});
