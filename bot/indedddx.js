require("dotenv").config();
const TelegramBot = require("node-telegram-bot-api");
const api = require("./api");
const { savetoken, getToken } = require("./src/helpers/tokenHandler");

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

const menu = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Start", callback_data: "/start" },
        { text: "Login", callback_data: "/login" },
        { text: "See Results", callback_data: "/seeresults" },
      ],
    ],
  },
};

const sendMenu = (chatId) => bot.sendMessage(chatId, "Here are the available commands:", menu);

const downloadPDF = async (chatId, examId, token) => {
  try {
    const response = await api.get(`exam/${examId}/download`, {
      headers: { Authorization: `Bearer ${token}` },
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "binary");
    await bot.sendDocument(chatId, buffer, {}, { filename: `exam_${examId}.pdf` });
  } catch (error) {
    console.error(error.response?.data || error.message);
    await bot.sendMessage(chatId, "An error occurred while downloading the PDF.");
  }
};

const createDownloadButton = (examId) => ({
  text: "Download PDF",
  callback_data: `download_pdf_${examId}`,
});

const createNavigationButtons = (page) => ({
  reply_markup: {
    inline_keyboard: [
      [
        { text: "Previous", callback_data: `prev_${page - 1}` },
        { text: "Next", callback_data: `next_${page + 1}` },
      ],
    ],
  },
});

const fetchExams = async (chatId, page = 1) => {
  const token = await getToken(chatId);
  if (!token) return bot.sendMessage(chatId, "You need to login first.");

  try {
    const response = await api.get("laboratory/exams", {
      params: { page, limit: 3, startDate: "2025-01-01", endDate: "2025-01-31" },
      headers: { Authorization: `Bearer ${token}` },
    });
    
    const exams = response.data.data;
    if (!exams.length) return bot.sendMessage(chatId, "No results found.");
    
    for (const exam of exams) {
      await bot.sendMessage(
        chatId,
        `Exam: ${exam.description},\nDate: ${new Date(exam.createdAt).toLocaleDateString()}`,
        { reply_markup: { inline_keyboard: [[createDownloadButton(exam.id)]] } }
      );
    }
    await bot.sendMessage(chatId, "Navigation", createNavigationButtons(page));
  } catch (error) {
    console.error(error);
    await bot.sendMessage(chatId, "An error occurred while fetching results.");
  }
};

bot.on("callback_query", async (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const command = callbackQuery.data;

  if (command.startsWith("prev_") || command.startsWith("next_")) {
    return fetchExams(chatId, parseInt(command.split("_")[1]));
  }

  if (/^download_pdf_\d+$/.test(command)) {
    const examId = command.split("_")[2];
    const token = await getToken(chatId);
    if (!token) return bot.sendMessage(chatId, "You need to login first.");
    return downloadPDF(chatId, examId, token);
  }

  switch (command) {
    case "/start":
      bot.sendMessage(chatId, "Welcome to my bot!");
      sendMenu(chatId);
      break;
    case "/seeresults":
      fetchExams(chatId);
      break;
    case "/login":
      bot.sendMessage(chatId, "Send your credentials in the format: username:password");
      bot.once("message", async (msg) => {
        const [username, password] = msg.text.split(":");
        try {
          const response = await api.post("auth/login", { email: username, password });
          await savetoken(response.data.token, chatId);
          await bot.sendMessage(chatId, "Login successful!");
        } catch (error) {
          console.error(error);
          await bot.sendMessage(chatId, "Login failed. Try again.");
        }
        sendMenu(chatId);
      });
      break;
  }
});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome to my bot!");
  sendMenu(chatId);
});
