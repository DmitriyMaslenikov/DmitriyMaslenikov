const express = require('express');
const router = express.Router();
const countryDefinition  = require('../modules/countryDefinition');
console.log(countryDefinition);
router.get('/', function(req, res, next) {
  res.send(countryDefinition.getCountry(req.ip));
});

module.exports = router;
