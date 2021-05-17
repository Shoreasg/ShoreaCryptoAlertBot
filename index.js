import Binance from 'binance-api-node'
import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
dotenv.config()



const binanceClient = Binance.default({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRETKEY,
})



//from github.com/yagop/node-telegram-bot-api
const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true })


bot.onText(/\/coin (.+)/, (msg, match) => {//from github.com/yagop/node-telegram-bot-api
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;

    // tell user received message, retriving data.
    bot.sendMessage(chatId, "Retriving data.....");

    const [CryptoCoin1, CryptoCoin2 = "USDT"] = match[1].split(" ") // match[1] can be single token (i.e. "BTC") or pair ("ETH BTC") If BTC, then

    binanceClient
        .avgPrice({ symbol: `${CryptoCoin1}${CryptoCoin2}`.toUpperCase() }) // example, { symbol: "BTCUSTD" }
        .then((avgPrice) => {
            bot.sendMessage(chatId, `The Price for ${CryptoCoin1.toUpperCase()}${CryptoCoin2}: ${(avgPrice['price'])}`);
        })
        .catch((error) =>
            bot.sendMessage(chatId, `Error retrieving the price for ${CryptoCoin1}${CryptoCoin2}: ${error}`));
        
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    switch (msg.text) {
        case "/start":
            bot.sendMessage(chatId, "Hi there! I am Shorea Crypto Alert Bot, begin by typing command /coin. For Example /coin BTC will give you the price for BTCUSDT. You can also search the price of other crypto pairing. For example /coin ADA BTC will give you the price of ADABTC");
            break;
        default:
            break;
    }


});

