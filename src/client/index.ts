require("dotenv").config();

import { Socket, createSocket } from "dgram";
import Client from "./client";

const client = new Client({
  port: parseInt(process.env.PORT) || 3000,
  server: { address: "localhost", port: 6510 },
});

client.initializeSocket(() => {
  client.requestMatch();
  setInterval(() => client.update(), 1000);
});
