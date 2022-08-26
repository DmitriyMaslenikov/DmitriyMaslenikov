import { AppDataSource } from './data-source';
import { Currency } from './entity/Currency';
import { ExchangeRate } from './entity/ExchangeRate';
import { Market } from './entity/Market';

export const initialize = async () => {
  try {
    await AppDataSource.initialize();
  } catch (e) {
    console.log(e);
  }
};

export const getMarkets = async () => {
  return await AppDataSource.manager.find(Market);
};
export const getCurrencys = async () => {
  return await AppDataSource.manager.find(Currency);
};

export const getExchangeRates = async (
  param1: number | null = null,
  param2: number | null = null,
  dateMin: Date | null = null,
  dateMax: Date | null = null
) => {
  const exchangeRatesRepository =
    AppDataSource.getRepository(ExchangeRate).createQueryBuilder(
      'exchangeRates'
    );

  if (param1) {
    exchangeRatesRepository.where('exchangeRates.marketId = :marketId ', {
      marketId: param1,
    });
  }

  if (param2) {
    exchangeRatesRepository.andWhere(
      ' exchangeRates.currencyId = :currencyId',
      { currencyId: param2 }
    );
  }
  if (dateMin) {
    exchangeRatesRepository.andWhere(' exchangeRates.date >= :dateMin ', {
      dateMin: dateMin,
    });
  }
  if (dateMax) {
    exchangeRatesRepository.andWhere(' exchangeRates.date <= :dateMax', {
      dateMax: dateMax,
    });
  }

  return exchangeRatesRepository.getMany();
};

export const saveExchangeRates = async (
  arr: {
    exchangeRate: number;
    marketId: number;
    currencyId: number;
    date: Date;
  }[]
) => {
  await AppDataSource.getRepository(ExchangeRate)
    .createQueryBuilder('exchangeRates')
    .insert()
    .values(arr)
    .execute();
};
