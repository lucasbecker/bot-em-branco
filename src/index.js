const TelegramBot = require('node-telegram-bot-api');
const DialogFlow = require('./dialogflow');
const YouTube = require('./youtube');

const { key } = require('./tokens/telegram-token.json');

const bot = new TelegramBot(key, { polling: true });

bot.on('message', async function(msg){
  const chatId = msg.chat.id; // é com este id que o bot sabe para quem responder
  console.log(msg.text);

  const dfResponse = await DialogFlow.sendMessage(chatId.toString(), msg.text);
  let responseText = dfResponse.text;

  if(dfResponse.intent === 'Último vídeo'){
    responseText = await YouTube.searchVideo(responseText, 'Último vídeo')
  } else if(dfResponse.intent === 'Vídeo com Tema'){
    responseText = await YouTube.searchVideo(responseText, dfResponse.fields.Temas.stringValue)
  }

  bot.sendMessage(chatId, responseText);
})