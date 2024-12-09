const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const BOT_TOKEN = '7947398284:AAFGL1fg3_ffuOVVDr5aiXQbogVVCoq0LHw';
const CHANNEL_ID = '@ForStory7';

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const member = await bot.getChatMember(CHANNEL_ID, chatId);
    if (['member', 'administrator', 'creator'].includes(member.status)) {
      bot.sendMessage(chatId, 'Rahmat! Siz kanalda obuna bo‘lgansiz.');
    } else {
      bot.sendMessage(
        chatId,
        `Botdan foydalanish uchun ushbu kanalda obuna bo'ling: ${CHANNEL_ID}`
      );
    }
  } catch (error) {
    console.error('Xato yuz berdi:', error.message);
    bot.sendMessage(
      chatId,
      `Obuna holatini tekshirishda muammo bo'ldi. Iltimos, keyinroq urinib ko'ring.`
    );
  }
});

app.get('/', (req, res) => {
  res.send('Telegram bot is live!');
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...');
});

bot.setWebHook('https://bot-8r9d.onrender.com/' + BOT_TOKEN);

