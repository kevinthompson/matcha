require("dotenv").config();
import dgram from "dgram";
import Packet from "./packet";
import PacketHandler from "./packet_handler";

const PORT = parseInt(process.env.PORT) || 3000;
const server: dgram.Socket = dgram.createSocket("udp4");

server.on("listening", () => {
  const connection = server.address();
  console.log(`[server] listening: ${connection.address}:${connection.port}`);
});

server.on("message", (buffer: Buffer, connection: Connection) => {
  console.log(
    `[server] message received from ${connection.address}:${connection.port}`
  );

  const packet = Packet.fromBuffer(buffer);
  PacketHandler.handle(packet);
});

server.on("error", (error) => {
  console.log(`[server] error:\n${error.stack}`);
  server.close();
});

server.bind(PORT);
