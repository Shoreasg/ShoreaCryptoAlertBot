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

//from github.com/yagop/node-telegram-bot-api
bot.onText(/\/coin (.+)/, (msg, match) => {
 

    const chatId = msg.chat.id;

    // tell user received message, retriving data.
    bot.sendMessage(chatId, "Retriving data.....");

    const [CryptoCoin1, CryptoCoin2 = "USDT"] = match[1].split(" ") // match[1] can be single token (i.e. "BTC") or pair ("ETH BTC")

    binanceClient
        .avgPrice({ symbol: `${CryptoCoin1}${CryptoCoin2}`.toUpperCase() })
        .then((avgPrice) => {
            bot.sendMessage(chatId, `<code>The Price for ${CryptoCoin1.toUpperCase()}${CryptoCoin2.toUpperCase()}: ${(avgPrice['price'])}</code>`);
        })
        .catch((error) =>
            bot.sendMessage(chatId, `Error retrieving the price for ${CryptoCoin1}${CryptoCoin2}: ${error}`));
        
});

//from github.com/yagop/node-telegram-bot-api
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    switch (msg.text) {
        case "/start":
            bot.sendMessage(chatId, "Hi there! I am Shorea Crypto Alert Bot, begin by typing command /coin. For Example /coin BTC will give you the price for BTCUSDT. You can also search the price of other crypto pairing. For example /coin ADA BTC will give you the price of ADABTC");
            break;
        case "/coin":
            bot.sendMessage(chatId, "Please type the coin that you are searching for. For Example, /coin BTC or /coin ADA BTC")
        default:
            break;
    }


});

