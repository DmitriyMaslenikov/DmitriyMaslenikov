const jwt = require('jsonwebtoken');
const userService = require('../service/userService');
const tokenService = require('../service/tokenService');

function getData(request, secretKey) {
  const token = request.headers.authorization.split(' ')[1];
  const decodedData = jwt.verify(token, secretKey);
  return decodedData.login;
}

async function sign_up(req, res) {
  try {
    const candidate = await userService.registration(
      req.body.email,
      req.body.password
    );
    res.json(candidate);
  } catch (e) {
    res.status(400).json({ message: `Registration error - ${e}` });
  }
}
async function login(req, res) {
  try {
    const user = await userService.login(req.body.email, req.body.password);
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: `Error - ${e}` });
  }
}
function refresh(req, res) {
  try {
    if (req.headers.authorization) {
      const login = getData(req, process.env.SECRET_KEY_REFRESH);
      const payload = {
        login,
      };
      const tokenNew = tokenService.generateToken(payload);
      res.json({
        accessToken: tokenNew.accessToken,
        refreshToken: tokenNew.refreshToken,
      });
    } else {
      res.json({ message: 'Headers_authorization не существует' });
    }
  } catch (e) {
    res.status(400).json({ message: `Error - ${e}` });
  }
}
function me(req, res) {
  try {
    const requestNum = Number(req.url.split('')[3]);
    if (req.headers.authorization) {
      res.json({
        request_num: requestNum,
        data: {
          username: getData(req, process.env.SECRET_KEY_ACCESS),
        },
      });
    } else {
      res.json({ message: 'Headers_authorization не существует' });
    }
  } catch (e) {
    res.status(401).json({ message: 'Unauthorised' });
  }
}

module.exports = { sign_up, login, refresh, me };
