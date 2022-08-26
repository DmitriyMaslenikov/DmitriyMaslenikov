import { urlCoinMarketCap, tokenCoinMarketCap } from '../config';
import axios from 'axios';
import { Currency } from '../orm/entity/Currency';
import { IDdata } from '../interfaces/dataInterface';
import { isString } from '../predicates/predicates';

type SomeServiceResponse = {
  data: { symbol: string; quote: { USD: { price: number } } }[];
};

let token = '';
if (isString(tokenCoinMarketCap)) {
  token = tokenCoinMarketCap;
}
let url = '';
if (isString(urlCoinMarketCap)) {
  url = urlCoinMarketCap;
}
const config = {
  headers: {
    'X-CMC_PRO_API_KEY': token,
    Accept: 'application/json',
    'Accept-Encoding': 'deflate, gzip',
  },
};

const getPricecoinMarketCap = async (
  currencys: Currency[]
): Promise<IDdata> => {
  const currencyRates = new Map();
  try {
    const response = await axios.get<SomeServiceResponse>(url, config);

    if (response) {
      currencys.forEach((currency: Currency) => {
        const responseElement = response.data.data.find((item) => {
          return currency.symbol === item.symbol;
        });
        if (responseElement) {
          currencyRates.set(currency.symbol, responseElement.quote.USD.price);
        } else {
          currencyRates.set(currency.symbol, null);
        }
      });
    }
  } catch (ex) {
    console.error(ex);
    throw `Error: market CoinMarketCap ${ex}`;
  }
  return { exchangeName: 'CoinMarketCap', data: currencyRates } as IDdata;
};

export { getPricecoinMarketCap };
