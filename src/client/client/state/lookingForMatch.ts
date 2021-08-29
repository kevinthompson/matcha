import Packet from "../../../server/packet";
import State from "../state";
import ConnectingToMatch from "./connectingToMatch";

export default class LookingForMatch extends State {
  public update() {
    const packet = new Packet({ type: "find-match" });
    this.client.send(packet, this.client.server);
  }

  public onPacketReceived(packet: Packet, connection: Connection) {
    State.prototype.onPacketReceived.call(this, packet, connection);

    switch (packet.type) {
      case "match-found":
        console.log(packet.data);
        this.client.connectToMatch(packet.data.match);
        break;
    }
  }
}
