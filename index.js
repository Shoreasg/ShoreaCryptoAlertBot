import Binance from 'binance-api-node'
import dotenv from 'dotenv'
import { formatMoney } from './utils/money.js'

dotenv.config()

const binanceClient = Binance.default({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRETKEY,
})
const Telebot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true }); //from github.com/yagop/node-telegram-bot-api 

Telebot.onText(/\/Type of Coin: (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;


    // tell user received message, retriving data.
    bot.sendMessage(chatId, "Retriving data");

    const CryptoCoin1 = 'ADA'
    const CryptoCoin2 = 'USDT'
    binanceClient
        .avgPrice({ symbol: `${CryptoCoin1}${CryptoCoin2}` }) // example, { symbol: "BTCUSTD" }
        .then((avgPrice) => {
            console.log(formatMoney(avgPrice['price']))
        })
        .catch((error) =>
            console.log(`Error retrieving the price for ${cryptoToken1}${cryptoToken2}: ${error}`)
        )
});



