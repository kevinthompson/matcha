import Client from "../client";
import Packet from "../../server/packet";

export default class State {
  constructor(protected client: Client) {}

  public update() {}

  public onPacketReceived(packet: Packet, connection: Connection) {
    switch (packet.type) {
      case "keep-alive":
        const response = new Packet({ type: "keep-alive" });
        this.client.socket.send(
          response.toBuffer(),
          connection.port,
          connection.address
        );
        break;
    }
  }

  public onSocketError(error) {
    console.log(`[client] error:\n${error.stack}`);
    this.client.socket.close();
  }
}
