const express = require('express');
const router = express.Router();
const cost = require('../modules/cost.js');
const deadline = require('../modules/deadline.js');
const hourMs = 60 * 60 * 1000;

router.use(express.json());

router.get('/', function (req, res, next) {
  res.send('Корректариум');
});
router.post('/', function (req, res) {
  const reqBody = req.body;
  const deadlineDate = 
    new Date(
      deadline.deadlineCalculation(
        deadline.getTime(reqBody.language, reqBody.count, reqBody.mimetype)))
        .toLocaleString();
  const timeMs = deadline.getTime(reqBody.language, reqBody.count, reqBody.mimetype);

  res.json({
    "price": cost.costCalculation(reqBody.language, reqBody.count, reqBody.mimetype),
    "time": timeMs / hourMs,
    "deadline": deadline.deadlineCalculation(timeMs),
    "deadline_date": deadlineDate
  });
})

module.exports = router;