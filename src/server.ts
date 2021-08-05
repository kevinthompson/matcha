import * as dotenv from 'dotenv'
dotenv.config();

const dgram = require('dgram');
const PORT = parseInt(process.env.PORT) || 3000;
const server = dgram.createSocket('udp4');

server.on('listening', () => {
  const address = server.address();
  console.log(`server listening ${address.address}:${address.port}`);
});

server.on('message', (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);

  // parse message
  // switch on message type
  // hand message off to correct responder
});

server.on('error', (err) => {
  console.log(`server error:\n${err.stack}`);
  server.close();
});

server.bind(PORT);