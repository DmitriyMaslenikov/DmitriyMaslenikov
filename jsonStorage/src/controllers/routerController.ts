import { Request, Response } from 'express';
import { getData, replaceData } from '../service/dbService';

const getDataToSave = async (req: Request, res: Response) => {
  if (req.headers['content-type'] === 'application/json') {
    replaceData(req.url, req.body);

    res.json('Данные успешно сохранены!');
  } else {
    res.json('Ошибка, данные должны быть в формате JSON');
  }
};

const returnData = async (req: Request, res: Response) => {
  const userData = await getData(req.url);
  if (userData) {
    res.json(userData.data);
  } else {
    res.status(404).json({ error: `По  ключу ${req.url} данные не найдены` });
  }
};

export { getDataToSave, returnData };
