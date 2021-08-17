import Packet from "./packet";
import RegisterClientPacketHandler from "./register_client_packet_handler";

class RegisterClientPacket extends Packet {
  public static handler = RegisterClientPacketHandler;
}

export default RegisterClientPacket;
