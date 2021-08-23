require("dotenv").config();

import { Socket, createSocket } from "dgram";
import Client from "./client";

const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "localhost";
const SERVER_PORT = process.env.SERVER_PORT || process.env.SERVER_PORT || 6510;

const client = new Client({
  port: parseInt(process.env.PORT) || 3000,
  server: { address: SERVER_ADDRESS, port: SERVER_PORT },
});

client.initializeSocket(() => {
  client.requestMatch();
  setInterval(() => client.update(), 1000);
});
