import PacketHandler from "./packet_handler";
import RegisterClientPacket from "./register_client_packet";

class RegisterClientPacketHandler extends PacketHandler {
  handle(packet: RegisterClientPacket) {
    // TODO: register client
  }
}

export default RegisterClientPacketHandler;
