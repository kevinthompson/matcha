import Packet from "../../../server/packet";
import State from "../state";

export default class ConnectingToMatch extends State {
  public update() {
    // TODO: send connection request to peers
  }

  public onPacketReceived(packet: Packet, connection: Connection) {
    switch (packet.type) {
      case "connection-request":
      // TODO: send connection accepted packet if client in match
      case "connection-accepted":
      // TODO: mark peer as confirmed
      // TODO: transition to connected state if all peers confirmed
    }
  }
}
