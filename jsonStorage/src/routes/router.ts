import express from 'express';
import { getDataToSave, returnData } from '../controllers/routerController';

const router = express.Router();

router.post('/**', getDataToSave);
router.get('/**', returnData);

export { router };
