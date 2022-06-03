const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.PORT ?? 3000;

app.set('trust proxy', true);

const index = require('./routes/index');
app.use('/', index);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Сервер запущен порт "${PORT}" ... `)
});

module.exports = app;