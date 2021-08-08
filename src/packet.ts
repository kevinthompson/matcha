class Packet {
  type: string;
  data?: object;

  private static packetTypes = {};

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

class RegistrationPacket extends Packet {}

class ConnectionPacket extends Packet {}

class UnknownPacket extends Packet {}

export default Packet;
