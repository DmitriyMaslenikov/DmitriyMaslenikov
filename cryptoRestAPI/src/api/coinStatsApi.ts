import { urlCoinStats } from '../config';
import axios from 'axios';
import { Currency } from '../orm/entity/Currency';
import { IDdata } from '../interfaces/dataInterface';
import { isString } from '../predicates/predicates';

type SomeServiceResponse = {
  coins: { symbol: string; price: number }[];
};

let url = '';
if (isString(urlCoinStats)) {
  url = urlCoinStats;
}

const getPriceCoinStats = async (currencys: Currency[]): Promise<IDdata> => {
  const currencyRates = new Map();
  try {
    const response = await axios.get<SomeServiceResponse>(url);

    if (response) {
      currencys.forEach((currency: Currency) => {
        const responseElement = response.data.coins.find((item) => {
          return currency.symbol === item.symbol;
        });
        if (responseElement) {
          currencyRates.set(currency.symbol, responseElement.price);
        } else {
          currencyRates.set(currency.symbol, null);
        }
      });
    }
  } catch (ex) {
    console.error(ex);
    throw `Error: market CoinStats ${ex}`;
  }
  return { exchangeName: 'CoinStats', data: currencyRates } as IDdata;
};

export { getPriceCoinStats };
