import Client from "../../client";
import Packet from "../../../server/packet";

export default class State {
  constructor(protected client: Client) {}

  public update() {}

  public onPacketReceived(packet: Packet, connection: Connection) {
    switch (packet.type) {
      case "KeepAlive":
        const response = new Packet({ type: "KeepAlive" });
        this.client.send(response, connection);
        break;
    }
  }
}
