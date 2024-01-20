const fs = require('fs');
const path = require('path');
const { stdout } = process;

const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(
  dirPath,
  { withFileTypes: true },
  (err, files) => {
    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.resolve(file.path, file.name);
        const fileName = file.name;
        const { name, ext } = path.parse(fileName);

        fs.stat(filePath, (err, stats) => {
          stdout.write(`${name} - ${ext.slice(1)} - ${stats.size}b\n`);
        });
      }
    }
  }
);