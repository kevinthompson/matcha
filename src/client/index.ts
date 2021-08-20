require("dotenv").config();

import * as dgram from "dgram";
import Packet from "../server/packet";

const PORT = 3000;
const client = dgram.createSocket("udp4");
const packet = new Packet({ type: "ping" });

client.on("listening", () => {
  const connection = client.address();
  console.log(`[client] listening: ${connection.address}:${connection.port}`);
});

client.on("message", (buffer: Buffer, connection: Connection) => {
  console.log(
    `[client] message received from ${connection.address}:${connection.port}`
  );

  const packet = Packet.fromBuffer(buffer);
  console.log(packet);
});

client.on("error", (error) => {
  console.log(`[client] error:\n${error.stack}`);
  client.close();
});

client.bind(PORT);

const sendPing = () => {
  client.send(packet.toBuffer(), 6510, "localhost");
};

setInterval(sendPing, 1000);
