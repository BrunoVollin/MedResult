const fs = require('fs').promises;
const path = require('path');


const savetoken = async (token, chatId) => {
  try {
    const tokensFilePath = path.join(__dirname, "tokens.json");
    const tokens = JSON.parse(await fs.readFile(tokensFilePath, "utf8"));

    tokens.push({ token, chatId });

    await fs.writeFile(tokensFilePath, JSON.stringify(tokens, null, 2));
  } catch (error) {
    console.log(error)
    console.error("An error occurred while saving the token.");
  }
};

const getToken = async (chatId) => {
  try {
    const tokensFilePath = path.join(__dirname, "tokens.json");
    const tokens = JSON.parse(await fs.readFile(tokensFilePath, "utf8"));

    const token = tokens.find((token) => token.chatId === chatId);

    return token;
  } catch (error) {
    console.error("An error occurred while getting the token.");
  }
};


module.exports = { savetoken, getToken };