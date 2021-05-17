import Binance from 'binance-api-node'
import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import { formatMoney } from './Utils/money.js'
dotenv.config()



const binanceClient = Binance.default({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRETKEY,
})

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true })
//from github.com/yagop/node-telegram-bot-api

bot.onText(/\/coin (.+)/, (msg1,data1) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId1 = msg1.chat.id;
    const [CryptoCoin1] = data1

    console.log(data1[2])
    // tell user received message, retriving data.
    bot.sendMessage(chatId1, "Please enter the pair that you would like to pair with.");

   
    

    

});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    switch (msg.text) {
        case "/start":
            bot.sendMessage(chatId, "Hi there! I am Shorea Crypto Alert Bot, Please enter the Coin that you would like to check");
            break;
        default:
            break;
    }


});

