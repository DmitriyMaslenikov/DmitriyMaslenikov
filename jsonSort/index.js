const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const util = require('util');

function readFile() {
    const filePath = path.join(__dirname, "./data/endpoint.txt");
    const rf = util.promisify(fs.readFile);
    return rf(filePath, "utf-8");
}

function fetchWithRetrys(url) {
    let response;
    let i = 0;
    do {
        response = fetch(url);
        i++;
    } while (!response.ok && i !== 3);
    return response;
}

(async function () {
    const content = await readFile();
    const urlArray = await content.split("\n");
    let isDone = 0;
    let error = 0;
    for (const url in urlArray) {
        const response = await fetchWithRetrys(urlArray[url]);
        if (!response.ok) {
            console.log(
                `${urlArray[url]}: Ошибка ответа сервера код ${response.status}`
            );
            error++;
        } else {
            const dataJson = await response.json();
            switch (true) {
                case dataJson.hasOwnProperty("isDone"):
                    if (dataJson.isDone)
                        isDone++;
                    console.log(`${urlArray[url]}: isDone - ${dataJson.isDone}`);
                    break;
                case dataJson.higherEducation?.hasOwnProperty("isDone"):
                    if (dataJson.higherEducation.isDone)
                        isDone++;
                    console.log(
                        `${urlArray[url]}: isDone - ${dataJson.higherEducation.isDone}`
                    );
                    break;
                case dataJson.location?.hasOwnProperty("isDone"):
                    if (dataJson.location.isDone)
                        isDone++;
                    console.log(`${urlArray[url]}: isDone - ${dataJson.location.isDone}`);
                    break;
            }
        }
    }
    console.log(
        `Значений True:   ${isDone},` +
        "\n" +
        `Значений False:  ${urlArray.length - isDone - error} `
    );
})();
