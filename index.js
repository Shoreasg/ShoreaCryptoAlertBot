import Binance from 'binance-api-node'
import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
import {formatMoney } from './Utils/money.js'
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
    const CryptoCoin1 = new data1[1];



    // tell user received message, retriving data.
    bot.sendMessage(chatId1, "Please enter the pair that you would like to pair with.");

    bot.onText(/\/coin2 (.+)/, (msg2, data2) => {
        const chatId2 = msg2.chat.id;
        const CryptoCoin2 = new data2[1];
        bot.sendMessage(chatId2, "Retriving data.....");


        binanceClient
            .avgPrice({ symbol: `${CryptoCoin1}${CryptoCoin2}` }) // example, { symbol: "BTCUSTD" }
            .then((avgPrice) => {
                bot.sendMessage(chatId2, `The Price for ${CryptoCoin1}${CryptoCoin2}: ${formatMoney(avgPrice['price'])}`);
            })
            .catch((error) =>
                bot.sendMessage(chatId2, `Error retrieving the price for ${CryptoCoin1}${CryptoCoin2}: ${error}`));


        

    });
   
    

    

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

