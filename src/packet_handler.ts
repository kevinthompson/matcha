import Packet from "./packet";
import RegisterClientPacketHandler from "./register_client_packet_handler";
import UnknownPacketHandler from "./unknown_packet_handler";

class PacketHandler {
  public static handle(packet: Packet) {
    const handler = new packet.handler();
    handler.handle(packet);
  }

  handle(packer: Packet) {
    // TODO: log/raise not implemented error
  }
}

export default PacketHandler;
