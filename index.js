import Binance from 'binance-api-node'
import dotenv from 'dotenv'
import { formatMoney } from './utils/money.js'

dotenv.config()

const binanceClient = Binance.default({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRETKEY,
})


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