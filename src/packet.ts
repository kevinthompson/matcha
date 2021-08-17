import PacketHandler from "./packet_handler";
import RegisterClientPacket from "./register_client_packet";
import UnknownPacket from "./unknown_packet";

class Packet {
  handler: PacketHandler;
  type: string;
  data?: object;

  private static packetTypes = {
    registration: RegisterClientPacket,
  };

  constructor(attributes: PacketAttributes) {
    this.attributes = attributes;
  }

  public static fromBuffer(buffer: Buffer) {
    let attributes: PacketAttributes;

    try {
      attributes = JSON.parse(buffer.toString());
    } catch (exception) {
      // TODO: log invalid buffer exception
    }

    return new (this.packetTypes[attributes.type] || UnknownPacket)(attributes);
  }

  public get attributes(): PacketAttributes {
    return {
      type: this.type,
      data: this.data,
    };
  }

  public set attributes({ type, data }: PacketAttributes) {
    this.type = type;
    this.data = data;
  }

  public toBuffer() {
    return Buffer.from(JSON.stringify(this.attributes));
  }
}

export default Packet;
