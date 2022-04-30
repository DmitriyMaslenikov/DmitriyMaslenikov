const fs = require("fs");
const path = require("path");

function getReadFile() {
  const filesContent = [];
  for (let i = 0; i < 20; i++) {
    const filePath = path.join(__dirname, "./data/out" + i + ".txt");
    const content = fs.readFileSync(filePath, "utf-8");
    filesContent[i] = content.split("\n");
  }
  return filesContent;
}

function getUniqueValuesFiles(arrContent) {
  const intersectionArray = [];
  arrContent.forEach((element, item) => {
    intersectionArray[item] = new Set();
    arrContent[item].forEach((element) => {
      intersectionArray[item].add(element);
    });
  });
  return intersectionArray;
}

function getUniqueValues(aintersectionArray) {
  const uniqueValues = new Set();
  aintersectionArray.forEach((element, item) => {
    aintersectionArray[item].forEach((element) => {
      uniqueValues.add(element);
    });
  });
  return uniqueValues;
}

function getNumberFiles(uniqueValuesOll, uniqueValuesEveryFile) {
  const uniqueVal = new Map();
  uniqueValuesOll.forEach(function (value) {
    let count = 0;
    uniqueValuesEveryFile.forEach((element, item) => {
      if (uniqueValuesEveryFile[item].has(value)) {
        count++;
      }
    });
    uniqueVal.set(value, count);
  });
  return uniqueVal;
}

function printUniqueValues(uniqueValues) {
  console.log(`Уникальных словосочетаний:${uniqueValues.size}`);
}

function printExistInAllFiles(uniqueValues) {
  let count = 0;
  uniqueValues.forEach(function (value, key) {
    if (value === 20) {
      count++;
    }
  });
  console.log(`Словосочетаний, которые есть во всех 20 файлах:${count}`);
}

function printExistInAtLeastTen(uniqueValues) {
  let count = 0;
  uniqueValues.forEach(function (value, key) {
    if (value >= 10) {
      count++;
    }
  });
  console.log(
    `Словосочетаний, которые есть, как минимум, в десяти файлах:${count}`
  );
}

const readFile = getReadFile();
const uniqueValuesEveryFile = getUniqueValuesFiles(readFile);
const uniqueValuesOll = getUniqueValues(uniqueValuesEveryFile);
const numberFiles = getNumberFiles(uniqueValuesOll, uniqueValuesEveryFile);

printUniqueValues(uniqueValuesOll);
printExistInAllFiles(numberFiles);
printExistInAtLeastTen(numberFiles);