const fs = require('fs');
const path = require('path');

const textFilePath = path.join(__dirname, 'text.txt');
let data = '';

const readableStream = fs.createReadStream(textFilePath, 'utf-8');
readableStream.on('data', (chunk) => (data += chunk));
readableStream.on('end', () => console.log(data));
