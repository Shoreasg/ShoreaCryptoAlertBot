import Binance from 'binance-api-node'
import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import { formatMoney } from './Utils/money.js'
dotenv.config()

import https from 'https'
import express from 'express'
import fs from 'fs'
import 'env.ts'

const app = express();


const server = https.createServer({
    key: fs.readFileSync('path/to/server.key'),
    cert: fs.readFileSync('path/to/server.cert')
}, app);

const binanceClient = Binance.default({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRETKEY,
})

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true })
//from github.com/yagop/node-telegram-bot-api

bot.onText(/\/coin (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;

    // tell user received message, retriving data.
    bot.sendMessage(chatId, "Retriving data.....");

    const CryptoCoin1 = match[1]
    const CryptoCoin2 = 'USDT'

    binanceClient
        .avgPrice({ symbol: `${CryptoCoin1}${CryptoCoin2}` }) // example, { symbol: "BTCUSTD" }
        .then((avgPrice) => {
            bot.sendMessage(chatId, `The Price for ${CryptoCoin1}${CryptoCoin2}: ${formatMoney(avgPrice['price'])}`);
        })
        .catch((error) =>
            bot.sendMessage(chatId, `Error retrieving the price for ${CryptoCoin1}${CryptoCoin2}: ${error}`));
        
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

