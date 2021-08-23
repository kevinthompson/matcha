require("dotenv").config();

import { Socket, createSocket } from "dgram";
import Packet from "./packet";
import { v4 as uuid } from "uuid";
// import PacketHandler from "./packet_handler";

const PORT = parseInt(process.env.PORT) || 6510;
const server: Socket = createSocket("udp4");

// TODO: move storage to database
let clients = [];
let matches = [];

class Client {
  public id: string;
  public address: string;
  public port: number;
  public lastMessageReceivedAt: number;

  constructor({ address, port }: { address: string; port: number }) {
    this.address = address;
    this.port = port;
    this.id = uuid();
    this.lastMessageReceivedAt = Date.now();
  }

  public get remoteAddress(): string {
    return `${this.address}:${this.port}`;
  }
}

const findOrCreateClientFromConnection = (connection: Connection): Client => {
  let currentClient;

  currentClient = clients.find(
    (client) =>
      client.address === connection.address && client.port === connection.port
  );

  if (!currentClient) {
    currentClient = new Client({
      address: connection.address,
      port: connection.port,
    });

    clients = [...clients, currentClient];
  } else {
    clients = clients.map((client) =>
      client === currentClient
        ? { ...currentClient, lastMessageReceivedAt: Date.now() }
        : client
    );
  }

  return currentClient;
};

// TODO: Move server to separate class with a socket
server.on("listening", () => {
  const connection = server.address();
  console.log(`[server] listening: ${connection.address}:${connection.port}`);
});

server.on("message", (buffer: Buffer, connection: Connection) => {
  const packet = Packet.fromBuffer(buffer);
  const remoteAddress = `${connection.address}:${connection.port}`;
  const currentClient = findOrCreateClientFromConnection(connection);

  console.log(`[server] received ${packet.type} packet from ${remoteAddress}.`);

  // TODO: move packet handling to handler classes
  switch (packet.type) {
    case "request-match":
      // TODO: add match request to worker queue to handle response
      let currentMatch = matches.find(
        (match) => match.clientIds.indexOf(currentClient.id) !== -1
      );

      if (!currentMatch) {
        const matchedClientIds = matches
          .map((match) => match.clientIds)
          .flat(Infinity);
        const unmatchedClientIds = clients
          .map((client) => client.id)
          .filter((id) => matchedClientIds.indexOf(id) === -1);

        const newMatchClientIds = unmatchedClientIds.slice(0, 2);

        if (newMatchClientIds.length === 2) {
          currentMatch = {
            id: uuid(),
            clientIds: newMatchClientIds,
          };

          matches = [...matches, currentMatch];
        }
      }

      if (currentMatch) {
        const packet = new Packet({
          type: "match-found",
          data: {
            match: {
              id: currentMatch.id,
              clients: clients
                .filter(
                  (client) =>
                    currentMatch.clientIds.indexOf(client.id) !== -1 &&
                    client.id !== currentClient.id
                )
                .map((client) => ({
                  address: client.address,
                  port: client.port,
                })),
            },
          },
        });

        server.send(packet.toBuffer(), connection.port, connection.address);
      }
      break;

    case "keep-alive":
      clients = clients.map((client) =>
        client.remoteAddress === remoteAddress
          ? { ...client, lastMessageReceivedAt: Date.now() }
          : client
      );
      break;
  }
});

server.on("error", (error) => {
  console.log(`[server] error:\n${error.stack}`);
  server.close();
});

server.bind(PORT);

// TODO: move to cron job
setInterval(() => {
  clients = clients.filter(
    (client) => client.lastMessageReceivedAt > Date.now() - 10000
  );

  clients.forEach((client) => {
    if (client.lastMessageReceivedAt < Date.now() - 5000) {
      const packet = new Packet({ type: "keep-alive" });
      server.send(packet.toBuffer(), client.port, client.address);
    }
  });
}, 1000);
