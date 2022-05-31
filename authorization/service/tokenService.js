const jwt = require('jsonwebtoken');

function generateToken(payload) {
  const accessToken = jwt.sign(payload, process.env.SECRET_KEY_ACCESS, {
    expiresIn: process.env.ACCESS_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, {
    expiresIn: process.env.REFRESH_EXPIRES_IN,
  });
  return { accessToken: accessToken, refreshToken: refreshToken };
}

module.exports = { generateToken };
