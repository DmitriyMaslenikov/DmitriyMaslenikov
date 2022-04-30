const fs = require("fs");
const path = require("path");

function readFile() {
  const filePath = path.join(__dirname, "./data/vacation.json");
  const contentJson = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(contentJson);
}

function grouping(content) {
  const listEmployees = new Map();
  content.forEach((element) => {
    if (!listEmployees.has(element.user._id)) {
      let employees = {
        userId: element.user._id,
        name: element.user.name,
        weekendDates: [],
      };
      listEmployees.set(element.user._id, employees);
    }
    listEmployees.get(element.user._id).weekendDates.push({
      startDate: element.startDate,
      endDate: element.endDate,
    });
  });

  return listEmployees;
}

const content = readFile();
const result = grouping(content);
const resultArray = Array.from(result.values());
const resultJson = JSON.stringify(resultArray, null, 2);
console.log(resultJson);
