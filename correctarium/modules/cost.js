const extension = require('./extension');

const costCalculation = (language, numberOfSigns, ext) => {
  const oneSignEnglish = 0.12;
  const costMinEnglish = 120;
  const oneSignUkrainian = 0.05;
  const costMinUkrainian = 50;
  const oneSignRussian = 0.05;
  const costMinRussian = 50;

  let costOneSign, costMin;
  switch (language) {
    case 'uk':
      costOneSign = oneSignUkrainian;
      costMin = costMinUkrainian;
      break;
    case 'ru':
      costOneSign = oneSignRussian;
      costMin = costMinRussian;
      break;
    case 'en':
      costOneSign = oneSignEnglish;
      costMin = costMinEnglish;
      break;
  }
  let cost =
    Math.round(numberOfSigns * costOneSign * extension.extension(ext) * 100) /
    100;
  cost = cost < costMin ? costMin : cost;
  return cost;
};

module.exports = { costCalculation };
