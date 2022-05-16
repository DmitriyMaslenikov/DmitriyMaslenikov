const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/IP2LOCATION-LITE-DB1.CSV");
const content = fs.readFileSync(filePath, "utf-8").split("\r\n");

function ipNumber(ipStr) {
    // Функция определяет  ip номер для определения страны по таблице.       
    //  Формуля взята с IP2Location  https://www.ip2location.com/faqs/db1-ip-country .

    const ip = ipStr.split('.').map( x => Number(x));
    return 16777216 * ip[0] + 65536 * ip[1] + 256 * ip[2] + ip[3];
}

function getStringValue(numberString) {
    return content[numberString].slice(1, content[numberString].length - 1).split('","');
}

function getStringTable(ipNumber, numberStringMin, numberStringMax) {
    const keyIpNumber = Math.floor((numberStringMax - numberStringMin) / 2) + numberStringMin;
    const stringValue = getStringValue(keyIpNumber);
    const minRange = stringValue[0];
    const maxRange = stringValue[1];
    let stringTable;
   
    if ((minRange <= ipNumber && ipNumber <= maxRange)) {
        stringTable = stringValue;
    } else if ((ipNumber > maxRange)) {
        const stringMin = keyIpNumber;
        stringTable = getStringTable(ipNumber, stringMin, numberStringMax);
    } else {
        const stringMax = keyIpNumber;
        stringTable = getStringTable(ipNumber, numberStringMin, stringMax);
    }
    return stringTable;
}

function getCountry(ipStr) {
    const number = ipNumber(ipStr);
    const strEndInterval1 = 2644;
    const strEndInterval2 = 35286;
    let stringTable;

    if (number <= 16777215) {
        stringTable = getStringValue(0);
    } else {
        switch (String(number).length) {
            case 8:
                stringTable = getStringTable(number, 1, strEndInterval1, 0, 0);
                break;
            case 9:
                stringTable = getStringTable(number, strEndInterval1, strEndInterval2, 0, 0);
                break;
            case 10:
                stringTable = getStringTable(number, strEndInterval2, content.length - 1, 0, 0);
                break;
        }
    }
    const country = stringTable[3];
    return `${country} - ${ipStr}`;
}
exports.getCountry = getCountry;  

