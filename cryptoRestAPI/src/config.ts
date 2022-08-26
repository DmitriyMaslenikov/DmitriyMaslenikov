import dotenv from 'dotenv';
dotenv.config();

export const PORT: string | undefined = process.env.PORT;

export const urlCoinMarketCap: string | undefined =
  process.env.URL_COINMARKETCAP;
export const tokenCoinMarketCap: string | undefined =
  process.env.X_CMC_PRO_API_KEY;

export const urlCoinBase: string | undefined = process.env.URL_COINBASE;
export const urlCoinPaprika: string | undefined = process.env.URL_COINPAPRIKA;
export const urlCoinStats: string | undefined = process.env.URL_COINSTATS;
export const urlKucoin: string | undefined = process.env.URL_KUCOIN;

export const type: string | undefined = process.env.DB_TYPE;
export const host: string | undefined = process.env.DB_HOST;
export const port: string | undefined = process.env.DB_PORT;
export const user: string | undefined = process.env.DB_USER;
export const password: string | undefined = process.env.DB_PASSWORD;
export const database: string | undefined = process.env.DB_NAME;

export const urlRestApi: string | undefined = process.env.URL_CRYPTO_REST_API;
