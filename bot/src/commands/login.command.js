const api = require("../helpers/api");
const { savetoken } = require("../helpers/tokenHandler");

const loginCommand = (msg, bot) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Send your credentials in the format: username:password"
  );
  bot.once("message", async (msg) => {
    const [username, password] = msg.text.split(":");
    try {
      const response = await api.post("auth/login", {
        email: username,
        password,
      });
      await savetoken(response.data.token, chatId);
      await bot.sendMessage(chatId, "Login successful!");
    } catch (error) {
      console.error(error);
      await bot.sendMessage(chatId, "Login failed. Try again.");
    }
  });
};

module.exports = loginCommand;
