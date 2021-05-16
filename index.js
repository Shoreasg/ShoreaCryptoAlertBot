import Binance from 'binance-api-node'
import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import { formatMoney } from './utils/money.js'

import http from "http";
http.createServer().listen(process.env.PORT);

dotenv.config()

const binanceClient = Binance.default({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRETKEY,
})

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true })
//from github.com/yagop/node-telegram-bot-api

bot.onText(/\/Coin (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;


    // tell user received message, retriving data.
    bot.sendMessage(chatId, "Retriving data");

    const CryptoCoin1 = chatId
    const CryptoCoin2 = 'USDT'

    binanceClient
        .avgPrice({ symbol: `${CryptoCoin1}${CryptoCoin2}` }) // example, { symbol: "BTCUSTD" }
        .then((avgPrice) => {
            console.log(formatMoney(avgPrice['price']))
        })
        .catch((error) =>
            console.log(`Error retrieving the price for ${CryptoCoin1}${CryptoCoin2}: ${error}`)
        )
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    switch (msg.text) {
        case "/start":
            bot.sendMessage(chatId, "Hi there! I am Shorea Crypto Alert Bot");
            break;
        default:
            break;
    }


});

bot.on("polling_error", (err) => console.log(err));
