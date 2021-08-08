import Packet from "./packet";

class PacketHandler {
  public static handleBuffer(buffer: Buffer) {}

  public static handle(packet: Packet) {
    const handlerClass = this.handlerFor(packet);
    const handler = new handlerClass();
    handler.handle(packet);
  }

  private static handlerFor(packet) {
    return {}[packet.type] || UnknownPacketHandler;
  }

  handle(packer: Packet) {
    // TODO: log/raise not implemented error
  }
}

class ConnectToClientPacketHandler extends PacketHandler {
  handle(packet: Packet) {
    // TODO: connect to client
  }
}

class RegisterClientPacketHandler extends PacketHandler {
  handle(packet: Packet) {
    // TODO: register client
  }
}

class UnknownPacketHandler extends PacketHandler {
  handle(packet: Packet) {
    // TODO: log unknown packet type
  }
}

export default PacketHandler;
