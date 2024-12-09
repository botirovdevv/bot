const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const app = express();

const BOT_TOKEN = '7201530441:AAF9MEY8KKfU22O3Uhh0SRuRGtNz4nKo-P8'; 
const CHANNEL_ID = '@ForStory7'; 

const bot = new TelegramBot(BOT_TOKEN, { polling: false });  // polling: false qilib o'zgartirdik

// /start komandasiga javob berish
bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;

  try {
    const member = await bot.getChatMember(CHANNEL_ID, chatId);
    if (['member', 'administrator', 'creator'].includes(member.status)) {
      bot.sendMessage(chatId, 'Rahmat! Siz kanalda obuna bo‘lgansiz va kanalimizdan foydalanishingiz mumkin');
    } else {
      bot.sendMessage(
        chatId,
        `Botdan foydalanish uchun ushbu kanalda obuna bo'ling: ${CHANNEL_ID} va qaytadan /start buyurug'ini yuboring`
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
// Ushbu sozlama faqat botni bir marta o'rnatishda kerak
bot.setWebHook('https://bot-8r9d.onrender.com/' + BOT_TOKEN);
