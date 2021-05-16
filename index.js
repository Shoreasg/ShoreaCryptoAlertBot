import Binance from 'binance-api-node'
import dotenv from 'dotenv'
import { formatMoney } from './utils/money.js'

dotenv.config()

// API keys can be generated here https://www.binance.com/en/my/settings/api-management
const binanceClient = Binance.default({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET,
})

const cryptoToken1 = 'BTC'
const cryptoToken2 = 'USDT'

binanceClient
    .avgPrice({ symbol: `${cryptoToken1}${cryptoToken2}` }) // example, { symbol: "BTCUSTD" }
    .then((avgPrice) => {
        console.log(formatMoney(avgPrice['price']))
    })
    .catch((error) =>
        console.log(`Error retrieving the price for ${cryptoToken1}${cryptoToken2}: ${error}`)
    )