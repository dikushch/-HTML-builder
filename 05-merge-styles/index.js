const fsPromises = require('node:fs/promises');
const fs = require('fs');
const path = require('path');

const sourceDir = path.join(__dirname, 'styles');
const distFile = path.join(__dirname, 'project-dist', 'bundle.css');

async function bundleStyles(sourcePath, distFile) {
  try {
    const files = await fsPromises.readdir(sourcePath, { withFileTypes: true });
    const stylesArr = [];
    for (const file of files) {
      if (file.isFile()) {
        const { ext } = path.parse(file.name);
        if (ext === '.css') {
          const data = await fsPromises.readFile(
            path.resolve(file.path, file.name),
            { encoding: 'utf8' }
          );
          stylesArr.push(data);
        }
      }
    }

    const writableStream = fs.createWriteStream(distFile);
    writableStream.write(stylesArr.join(''));
  } catch (err) {
    console.error(err);
  }
};

bundleStyles(sourceDir, distFile);