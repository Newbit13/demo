const xlsx = require("node-xlsx");

const fs = require("fs");

fs.readFile("./dd.xls", function (err, data) {
  let sheetList = xlsx.parse(data); //对数据进行处理
  sheetList[0].data.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (colIndex === 0) {
        console.log(cell);
      }
    });
  });
});
