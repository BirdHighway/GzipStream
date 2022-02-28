import { createGunzip } from 'zlib';
import { createServer } from 'http';
import { createWriteStream } from 'fs';


createServer((req, res) => {
  console.log('request received');
  const fileName = req.headers['x-file-name'] || 'data.txt';
  const writeStream = createWriteStream(fileName);
  // request is a stream
  req
    .pipe(createGunzip())
    .pipe(writeStream)
    .on('finish', () => {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end(`file unzipped and saved to ${fileName}\n`);
      console.log(`file unzipped and saved to ${fileName}`);
    })
    .on('error', (error) => {
      res.writeHead(500, {'Content-Type': 'text/plain'});
      res.end(`Error!\n${JSON.stringify(error, null, 2)}`);
      console.log(error);
    });
}).listen(3000);
