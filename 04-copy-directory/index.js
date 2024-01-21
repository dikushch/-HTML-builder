const fsPromises = require('node:fs/promises');
const path = require('path');

const sourceDir = path.join(__dirname, 'files');
const destDir = path.join(__dirname, 'files-copy');

async function copyDir(sourcePath, destPath) {
  try {
    await fsPromises.rm(destPath, { recursive: true, force: true });
    await fsPromises.mkdir(destPath, { recursive: true });
    const files = await fsPromises.readdir(sourcePath, { withFileTypes: true });
    for (const file of files) {
      if (file.isFile()) {
        const sourceFile = path.resolve(file.path, file.name);
        const destFile = path.resolve(destPath, file.name);

        await fsPromises.copyFile(sourceFile, destFile);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

copyDir(sourceDir, destDir);