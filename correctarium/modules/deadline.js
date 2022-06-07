const extension = require('./extension');
const hourMs = 60 * 60 * 1000;
const minuteMs = 60 * 1000;
const secondMs = 1000;
const workTimeStart = 10;
const workTimeEnd = 19;

const workTimeAdd = (dateMs) => {
  let additionalWorkTime = 0;
  const date = new Date(dateMs);
  if (date.getHours() < workTimeStart) {
    additionalWorkTime =
      (workTimeStart - date.getHours()) * hourMs -
      date.getMinutes() * minuteMs -
      date.getSeconds() * secondMs -
      date.getMilliseconds();
  } else if (date.getHours() >= workTimeEnd) {
    additionalWorkTime =
      (workTimeStart + 24 - date.getHours()) * hourMs -
      date.getMinutes() * minuteMs -
      date.getSeconds() * secondMs -
      date.getMilliseconds();
  }
  return additionalWorkTime;
};

const workTimeToFinish = (dateMs) => {
  const date = new Date(dateMs);
  return (
    (workTimeEnd - date.getHours()) * hourMs -
    date.getMinutes() * minuteMs -
    date.getSeconds() * secondMs -
    date.getMilliseconds() +
    dateMs
  );
};

const holiday = (dateMs) => {
  let additionalTimeHoliday = 0;
  const date = new Date(dateMs);
  switch (date.getDay()) {
    case 0:
      additionalTimeHoliday = 24 * hourMs;
      break;
    case 6:
      additionalTimeHoliday =
        (workTimeStart + 24 * 2 - date.getHours()) * hourMs -
        date.getMinutes() * minuteMs -
        date.getSeconds() * secondMs -
        date.getMilliseconds();
      break;
  }

  return additionalTimeHoliday;
};

const getTime = (language, numberOfSigns, ext) => {
  const additionalTime = 0.5;
  const editingSpeedEnglish = 333;
  const editingSpeedUkrainian = 1333;
  const editingSpeedRussian = 1333;
  let editingSpeed;

  switch (language) {
    case 'uk':
      editingSpeed = editingSpeedUkrainian;
      break;
    case 'ru':
      editingSpeed = editingSpeedRussian;
      break;
    case 'en':
      editingSpeed = editingSpeedEnglish;
      break;
  }
  const leadTime =
    (additionalTime + numberOfSigns / editingSpeed) *
    hourMs *
    extension.extension(ext);

  return Math.round(leadTime < hourMs ? hourMs : leadTime);
};

const deadlineCalculation = (leadTime) => {
  const dateReceivingStart = new Date();
  let deadline, deadlineMs, editingSpeed;
  let dateReceivingMs =
    Date.parse(dateReceivingStart) + workTimeAdd(dateReceivingStart);
  dateReceivingMs += holiday(dateReceivingMs);
  const dateReceiving = new Date(dateReceivingMs);
  do {
    if (workTimeToFinish(dateReceivingMs) - dateReceivingMs - leadTime >= 0) {
      deadlineMs = dateReceivingMs + leadTime;
      leadTime = 0;
    } else {
      leadTime -= workTimeToFinish(dateReceivingMs) - dateReceivingMs;
      dateReceivingMs =
        workTimeAdd(workTimeToFinish(dateReceivingMs)) +
        workTimeToFinish(dateReceivingMs);
      dateReceivingMs += holiday(dateReceivingMs);
    }
  } while (leadTime !== 0);

  return deadlineMs;
};

module.exports = { deadlineCalculation, getTime };
