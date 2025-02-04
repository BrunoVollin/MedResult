const api = require("../helpers/api");
const { getToken } = require("../helpers/tokenHandler");

const downloadCommand = async (msg, bot, examId) => {
    const chatId = msg.chat.id;
    const token = await getToken();
    try {
        const response = await api.get(`exam/${examId}/download`, {
            headers: { Authorization: `Bearer ${token}` },
            responseType: "arraybuffer",
        });
        const buffer = Buffer.from(response.data, "binary");
        await bot.sendDocument(
            chatId,
            buffer,
            {},
            { filename: `exam_${examId}.pdf` }
        );
    } catch (error) {
        console.error(JSON.stringify(error));
        await bot.sendMessage(
            chatId,
            "An error occurred while downloading the PDF."
        );
    }
};

module.exports = downloadCommand;
