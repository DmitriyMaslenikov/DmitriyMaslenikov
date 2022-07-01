import dotenv from 'dotenv';
import express, { Express } from 'express';
import { router } from './routes/router';

dotenv.config();

const app: Express = express();
const PORT: string | undefined = process.env.PORT ?? '5000';

app.use(express.json({ strict: false }));
app.use('/', router);

(async () => {
  try {
    app.listen(PORT, () => console.log(`Сервер запущен порт - ${PORT}`));
  } catch (e) {
    console.log(e);
  }
})();
