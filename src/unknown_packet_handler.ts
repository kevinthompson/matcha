import PacketHandler from "./packet_handler";
import UnknownPacket from "./unknown_packet";

class UnknownPacketHandler extends PacketHandler {
  handle(packet: UnknownPacket) {
    // TODO: log unknown packet type
  }
}

export default UnknownPacketHandler;
