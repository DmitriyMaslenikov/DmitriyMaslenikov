import {
  getCurrencys,
  getMarkets,
  initialize,
  saveExchangeRates,
} from './orm/index';

import { getPricecoinMarketCap } from './api/coinMarketCapApi';
import { getPriceCoinStats } from './api/coinStatsApi';
import { getPriceKucoin } from './api/kucoinApi';
import { getPriceCoinbase } from './api/coinbaseApi';
import { getPriceCoinpaprika } from './api/coinpaprikaApi';
import { Currency } from './orm/entity/Currency';
import { Market } from './orm/entity/Market';
import express, { Express } from 'express';
import { router } from './routes/router';
import axios from 'axios';
import cron from 'cron';
import { IDdata } from './interfaces/dataInterface';
import { isNumber } from './predicates/predicates';
import { PORT, urlRestApi } from './config';

const app: Express = express();

app.use(express.json({ strict: false }));
app.use('/', router);

const saveData = async (
  element: IDdata,
  marketsMap: Map<string, number>,
  currencysMap: Map<string, number>,
  date: Date
) => {
  const dataArr: {
    exchangeRate: number;
    marketId: number;
    currencyId: number;
    date: Date;
  }[] = [];

  for (const value of element.data.entries()) {
    let marketIdNumber = 0;
    const marketId = marketsMap.get(element.exchangeName);
    if (isNumber(marketId)) {
      marketIdNumber = marketId;
    }

    let currencyIdNumber = 0;
    const currencyId = currencysMap.get(value[0]);
    if (isNumber(currencyId)) {
      currencyIdNumber = currencyId;
    }

    dataArr.push({
      exchangeRate: value[1],
      marketId: marketIdNumber,
      currencyId: currencyIdNumber,
      date: date,
    });
  }
  await saveExchangeRates(dataArr);
};

(async () => {
  try {
    await initialize();
    app.listen(PORT, () => console.log(`Сервер запущен порт - ${PORT}`));
  } catch (e) {
    console.log(e);
  }
  const CronJob = cron.CronJob;
  const job = new CronJob(
    '0 */05 * * * *',
    async () => {
      await getData();
      await axios({
        method: 'get',
        url: urlRestApi,
      });
    },
    null,
    true,
    'Europe/Kiev'
  );
  job.start();
})();

const averageValueCalculation = (data: IDdata[]) => {
  const averageValue = new Map();

  for (const key of data[0].data.keys()) {
    let sum = 0;
    let i = 0;

    data.forEach((element: IDdata) => {
      if (element.data.get(key) !== null) {
        i++;

        const rate: number | undefined = element.data.get(key);
        if (rate) {
          sum += rate;
        }
      }
    });

    if (i !== 0) {
      averageValue.set(key, sum / i);
    } else {
      averageValue.set(key, null);
    }
  }

  return { exchangeName: 'AverageValue', data: averageValue } as IDdata;
};
const getData = async () => {
  const date = new Date();
  const currencys = await getCurrencys();
  const markets = await getMarkets();

  const marketsMap: Map<string, number> = new Map();

  markets.forEach((val: Market) => {
    marketsMap.set(val.name, val.id);
  });

  const currencysMap: Map<string, number> = new Map();

  currencys.forEach((val: Currency) => {
    currencysMap.set(val.symbol, val.id);
  });

  const arr: IDdata[] = [];
  const arrPromise: Promise<IDdata>[] = [
    getPricecoinMarketCap(currencys),
    getPriceCoinbase(currencys),
    getPriceCoinStats(currencys),
    getPriceKucoin(currencys),
    getPriceCoinpaprika(currencys),
  ];
  const arrPromiseNew = arrPromise.map(
    async (valuePromise: Promise<IDdata>) => {
      const value = await valuePromise;
      arr.push(value);
      await saveData(value, marketsMap, currencysMap, date);
    }
  );

  console.log(await Promise.allSettled(arrPromiseNew));

  if (arr.length !== 0) {
    saveData(averageValueCalculation(arr), marketsMap, currencysMap, date);
  }
};
