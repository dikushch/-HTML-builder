const { stdin, stdout } = process;
const fs = require("fs");
const path = require("path");
const os = require("os");

function closeScript() {
  stdout.write('Your text was saved in text.txt! Bye! :)\n');
  process.exit();
}

const filePath = path.join(__dirname, 'text.txt');
const writableStream = fs.createWriteStream(filePath);
const exitKeyword = 'exit' + os.EOL;

stdout.write('Hello! :) print what you want to save:\n');

stdin.on("data", (data) => {
  if (data.toString() === exitKeyword) {
    closeScript();
  }

  writableStream.write(data);
});

process.on('SIGINT', () => {
  closeScript();
});