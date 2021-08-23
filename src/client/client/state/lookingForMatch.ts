import Packet from "../../../server/packet";
import State from "../state";
import ConnectingToMatch from "./connectingToMatch";

export default class LookingForMatch extends State {
  public update() {
    const packet = new Packet({ type: "request-match" });

    this.client.socket.send(
      packet.toBuffer(),
      this.client.server.port,
      this.client.server.address
    );
  }

  public onPacketReceived(packet: Packet, connection: Connection) {
    State.prototype.onPacketReceived.call(this, packet, connection);

    switch (packet.type) {
      case "match-found":
        // TODO: handle match data
        this.client.transitionTo(ConnectingToMatch);
        break;
    }
  }
}
