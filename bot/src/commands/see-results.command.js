const api = require("../helpers/api");
const { getToken } = require("../helpers/tokenHandler");

const seeResultsCommand = async (msg, bot, page = 1) => {
  const chatId = msg.chat.id;
  const token = await getToken(chatId);
  if (!token) return bot.sendMessage(chatId, "You need to login first.");

  try {
    const response = await api.get("laboratory/exams", {
      params: {
        page,
        limit: 10,
      },
      headers: { Authorization: `Bearer ${token}` },
    });

    const exams = response.data.data;
    if (!exams.length) return bot.sendMessage(chatId, "No results found.");

    for (const exam of exams) {
      await bot.sendMessage(
        chatId,
        `Exam: ${exam.description},\nDate: ${new Date(
          exam.createdAt
        ).toLocaleDateString()},\nDownload: /download${exam.id}`
      );
    }
    const currentPage = Number(response.data.current_page);
    const totalPages = Math.ceil(
      response.data.total / Number(response.data.per_page)
    );
    let paginationMessage = "";

    if (currentPage > 1) {
      paginationMessage += `Previous page: /results${currentPage - 1}\n`;
    }

    if (currentPage < totalPages) {
      paginationMessage += `Next page: /results${currentPage + 1}`;
    }

    if (paginationMessage != "") {
      await bot.sendMessage(chatId, paginationMessage);
    }
  } catch (error) {
    console.error(JSON.stringify(error));
    await bot.sendMessage(chatId, "An error occurred while fetching results.");
  }
};

module.exports = seeResultsCommand;
