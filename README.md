# Stream Zipping Example

## Server

The server simply receives an incoming POST request, decompresses the body, and writes it to a file as it decompresses it.


## Client

The client reads a file from disk, and as it reads it the file is compressed and sent to the server.


## How to Run

Install axios:
```
npm install
```


Start the server (listens on port 3000):
```
node server.js
```


In another terminal, run the client, specifying the source file to read from and the name you want the server to save it as.

```
node client.js package-lock.json destinationFile.txt
```