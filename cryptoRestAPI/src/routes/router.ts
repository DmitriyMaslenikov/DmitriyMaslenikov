import express from 'express';
import { query } from 'express-validator';

import {
  returnData,
  returnMarket,
  returnCurrency,
  startPage,
} from '../controllers/routerController';

const router = express.Router();

router.get('/', startPage);
router.get('/market', returnMarket);
router.get('/currency', returnCurrency);
router.get(
  '/data',
  query('dateMin')
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage('Параметр dateMin введен не верно! '),
  query('dateMax')
    .isISO8601({ strict: true, strictSeparator: true })
    .withMessage('Параметр dateMax введен не верно! '),
  returnData
);

export { router };
