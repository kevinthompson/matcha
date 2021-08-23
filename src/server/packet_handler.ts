import { Socket } from "dgram";
import Packet from "./packet";

let clients = [];
let matches = [];

class PacketHandler {
  constructor(private server: Socket, private connection: Connection) {}

  public static handle(server: Socket, connection: Connection, packet: Packet) {
    const handlerClass = this.handlerFor(packet);
    const handler = new handlerClass(server, connection);
    handler.handle(packet);
  }

  private static handlerFor(packet: Packet) {
    // TODO: Implement packet handler lookup
    return this;
  }

  async handle(packet: Packet) {
    const { server, connection } = this;

    // TODO: Implement separate packet handler classes
    switch (packet.type) {
      case "request-match":
        break;

      case "keep-alive":
        clients.map((client) => {
          if (
            client.address == connection.address &&
            client.port == connection.port
          ) {
            client.messageReceivedAt = Date.now();
          }

          return client;
        });

        console.log(clients);

        break;
    }
  }
}

export default PacketHandler;
