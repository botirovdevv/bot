const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

// Tokeningizni bu yerga kiriting
const BOT_TOKEN = '7947398284:AAFGL1fg3_ffuOVVDr5aiXQbogVVCoq0LHw';
const CHANNEL_ID = '@iphone_sticker'; // Kanal nomi yoki ID

// Telegram botni yaratish
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// /start komandasiga javob berish
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    // Foydalanuvchining obuna holatini tekshirish
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

// Web-serverni yaratish va ishlashini tekshirish
app.get('/', (req, res) => {
  res.send('Telegram bot is live!'); // Bu saytni Render'da ko'rish mumkin
});

// Serverni ishga tushurish
app.listen(process.env.PORT || 3000, () => {
  console.log('Server is running...');
});

// Webhookni o'rnatish (botni telegram serveriga bog'lash)
bot.setWebHook('https://bot-8r9d.onrender.com/' + BOT_TOKEN);

