import { Request, Response } from 'express';
import { getMarkets, getExchangeRates, getCurrencys } from '../orm/index';
import { Market } from '../orm/entity/Market';
import { Currency } from '../orm/entity/Currency';
import { ExchangeRate } from '../orm/entity/ExchangeRate';
import path from 'path';
import { marked } from 'marked';
import fs from 'fs';
import { validationResult } from 'express-validator';

type ID = number | null;
type DATE = Date | null;

export const startPage = async (req: Request, res: Response) => {
  if (req) {
    fs.readFile(
      path.join(__dirname, '../..', 'README.md'),
      'utf8',
      (err, data) => {
        if (err) {
          console.error(err);
          return;
        }

        res.send(String(marked.parse(data)));
      }
    );
  }
};

export const returnData = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  console.error(errors.array());
  const errArray: { value: string; error: string }[] = [];
  let marketId: ID = null;
  let currencyId: ID = null;
  let dateMin: DATE = null;
  let dateMax: DATE = null;
  if (errors.array().length !== 0) {
    errors.array().forEach((element) => {
      if (element.value) {
        errArray.push({
          value: element.value,
          error: `Параметр ${element.param} введен не верно`,
        });
      }
    });
  }
  const markets = await getMarkets();
  const currencys = await getCurrencys();

  const marketMapBack = new Map();

  markets.forEach((val: Market) => {
    marketMapBack.set(val.id, val.name);
  });

  const currencysMapBack = new Map();

  currencys.forEach((val: Currency) => {
    currencysMapBack.set(val.id, val.symbol);
  });

  if (req.query) {
    if (req.query.market) {
      const queryMarket = req.query.market;
      if (typeof queryMarket === 'string') {
        const market = markets.find((element) => {
          return element.name === queryMarket;
        });
        if (market !== undefined) {
          marketId = market.id;
        } else {
          errArray.push({
            value: queryMarket,
            error: `Параметр market введен не верно`,
          });
        }
      }
    }

    if (req.query.currency) {
      const queryCurrency = req.query.currency;
      if (typeof queryCurrency === 'string') {
        const currency = currencys.find((element) => {
          return element.symbol === queryCurrency.toUpperCase();
        });
        if (currency !== undefined) {
          currencyId = currency.id;
        } else {
          errArray.push({
            value: queryCurrency,
            error: `Параметр currency введен не верно`,
          });
        }
      }
    }
    let dateMinUTC;
    if (req.query.dateMin) {
      const queryDateMin = req.query.dateMin;
      if (typeof queryDateMin === 'string') {
        dateMin = new Date(queryDateMin);
        dateMinUTC = Date.parse(queryDateMin);
      }
    }

    if (req.query.dateMax) {
      const queryDateMax = req.query.dateMax;
      if (typeof queryDateMax === 'string') {
        dateMax = new Date(queryDateMax);
        const dateMaxUTC = Date.parse(queryDateMax);
        if (dateMinUTC) {
          if (dateMaxUTC - dateMinUTC <= 0) {
            errArray.push({
              value: queryDateMax,
              error: `Параметр dateMax: Максиамальная дата должна быть больше минимальной `,
            });
          }
        }
      }
    }
  }

  if (errArray.length === 0) {
    const exchangeRates = await getExchangeRates(
      marketId,
      currencyId,
      dateMin,
      dateMax
    );
    const exchangeRatesArr: {
      currencySymbol: string;
      marketName: string;
      price_usd: number;
      date: Date;
    }[] = [];
    exchangeRates.forEach((element: ExchangeRate) => {
      exchangeRatesArr.push({
        currencySymbol: currencysMapBack.get(element.currencyId),
        marketName: marketMapBack.get(element.marketId),
        price_usd: element.exchangeRate,
        date: element.date,
      });
    });

    res.json(exchangeRatesArr);
  } else {
    console.error(errArray);
    res.status(400).json(errArray);
  }
};

export const returnMarket = async (req: Request, res: Response) => {
  if (req) {
    const market = await getMarkets();

    res.json(market);
  }
};

export const returnCurrency = async (req: Request, res: Response) => {
  if (req) {
    const currency = await getCurrencys();
    res.json(currency);
  }
};
