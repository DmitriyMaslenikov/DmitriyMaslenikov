import { urlCoinBase } from '../config';
import axios from 'axios';
import { Currency } from '../orm/entity/Currency';
import { IDdata } from '../interfaces/dataInterface';
import { isString } from '../predicates/predicates';

let url = '';
if (isString(urlCoinBase)) {
  url = urlCoinBase;
}

const getPriceCoinbase = async (currency: Currency[]): Promise<IDdata> => {
  const currencyRates = new Map();
  try {
    const response = await axios.get(url);

    if (response) {
      currency.forEach((element) => {
        if (element.symbol in response.data.data.rates) {
          currencyRates.set(
            element.symbol,
            1 / response.data.data.rates[element.symbol]
          );
        } else {
          currencyRates.set(element.symbol, null);
        }
      });
    }
  } catch (ex) {
    console.error(ex);
    throw `Error: market CoinBase ${ex}`;
  }
  return { exchangeName: 'CoinBase', data: currencyRates } as IDdata;
};

export { getPriceCoinbase };
