import { urlCoinPaprika } from '../config';
import axios from 'axios';
import { Currency } from '../orm/entity/Currency';
import { IDdata } from '../interfaces/dataInterface';
import { isString } from '../predicates/predicates';

type SomeServiceResponse = { symbol: string; price_usd: number }[];

let url = '';
if (isString(urlCoinPaprika)) {
  url = urlCoinPaprika;
}
const getPriceCoinpaprika = async (currencys: Currency[]): Promise<IDdata> => {
  const currencyRates = new Map();
  try {
    const response = await axios.get<SomeServiceResponse>(url);

    if (response) {
      currencys.forEach((currency: Currency) => {
        const responseElement = response.data.find((item) => {
          return currency.symbol === item.symbol;
        });
        if (responseElement) {
          currencyRates.set(currency.symbol, Number(responseElement.price_usd));
        } else {
          currencyRates.set(currency.symbol, null);
        }
      });
    }
  } catch (ex) {
    console.error(ex);
    throw `Error: market CoinPaprika  ${ex}`;
  }
  return { exchangeName: 'CoinPaprika', data: currencyRates } as IDdata;
};

export { getPriceCoinpaprika };
