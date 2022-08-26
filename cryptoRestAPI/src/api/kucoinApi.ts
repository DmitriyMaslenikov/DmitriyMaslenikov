import { urlKucoin } from '../config';
import axios from 'axios';
import { Currency } from '../orm/entity/Currency';
import { IDdata } from '../interfaces/dataInterface';
import { isString } from '../predicates/predicates';

let url = '';
if (isString(urlKucoin)) {
  url = urlKucoin;
}
const getPriceKucoin = async (currency: Currency[]): Promise<IDdata> => {
  const currencyRates = new Map();
  try {
    const response = await axios.get(url);

    if (response) {
      currency.forEach((element: Currency) => {
        if (element.symbol in response.data.data) {
          currencyRates.set(
            element.symbol,
            Number(response.data.data[element.symbol])
          );
        } else {
          currencyRates.set(element.symbol, null);
        }
      });
    }
  } catch (ex) {
    console.error(ex);
    throw `Error: market Kucoin ${ex}`;
  }
  return { exchangeName: 'Kucoin', data: currencyRates } as IDdata;
};

export { getPriceKucoin };
