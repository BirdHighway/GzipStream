import { createGzip } from 'zlib';
import { createReadStream } from 'fs';
import * as axios from 'axios';

const sourceFile = process.argv[2];
const destinationFile = process.argv[3];

const zippedStream = createReadStream(sourceFile)
  .pipe(createGzip());

console.log('making axios request...');

axios.default({
  method: 'POST',
  url: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/octet-stream',
    'Content-Encoding': 'gzip',
    'x-file-name': destinationFile
  },
  data: zippedStream
}).then((response) => {
  console.log('Response:', response.data);
}).catch((error) => {
  console.log('Error caught:', error);
});