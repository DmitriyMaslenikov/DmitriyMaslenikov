const express = require('express');
const router = express.Router();
const controller = require('../controllers/authController');

router.post('/sign_up', controller.sign_up);
router.post('/login', controller.login);
router.post('/refresh', controller.refresh);
router.get('/me[0-9]', controller.me);

module.exports = router;
