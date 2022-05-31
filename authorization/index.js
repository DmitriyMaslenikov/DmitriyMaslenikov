require('dotenv').config();
const express = require('express');
const { listen } = require('express/lib/application');
const app = express();
const authRouter = require('./routes/authRouter');

const PORT = process.env.PORT ?? 5000;

app.use(express.json());
app.use('/auth', authRouter);

(async function () {
  try {
    app.listen(PORT, () => console.log(`Сервер запущен, порт - ${PORT}`));
  } catch (e) {
    console.error(e);
  }
})();
