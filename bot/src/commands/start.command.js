const startCommand = (msg, bot) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome to my bot!");
};

module.exports = startCommand;
