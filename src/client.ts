import * as dotenv from 'dotenv'
dotenv.config();

const dgram = require('dgram');
const PORT = parseInt(process.env.PORT) || 3000;

const client = dgram.createSocket('udp4');

client.send('hello world', PORT, 'localhost', (err) => {
  client.close();
});