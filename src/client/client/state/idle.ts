import Packet from "../../../server/packet";
import State from "../state";

export default class Idle extends State {
  public update() {}

  public onPacketReceived(packet: Packet, connection: Connection) {
    State.prototype.onPacketReceived.call(this, packet, connection);
  }
}
