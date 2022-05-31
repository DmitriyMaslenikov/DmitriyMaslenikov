const mongo = require('../connectMongodb');
const tokenService = require('./tokenService');
const bcrypt = require('bcryptjs');

const mongoClientPromise = mongo.getCollectionUsers();

async function registration(email, password) {
  const users = await mongoClientPromise;
  const candidate = await users.findOne({ email });
  if (!candidate) {
    const hashPassword = bcrypt.hashSync(password, 8);
    await users.insertOne({ email: email, password: hashPassword });
    return { message: 'Пользователь был успешно зарегистрирован' };
  } else {
    return { message: 'Пользователь с таким email уже существует' };
  }
}

async function login(email, password) {
  const users = await mongoClientPromise;
  const user = await users.findOne({ email });
  if (!user) {
    return { message: `Пользователь с email ${email} не найден` };
  } else {
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return { message: 'Введен неверный пароль' };
    } else {
      const login = user.email;
      const payload = {
        login,
      };
      const token = tokenService.generateToken(payload);
      return {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      };
    }
  }
}

module.exports = { registration, login };
