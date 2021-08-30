class Packet {
  type: string;
  data;

  private static packetTypes = {};

  constructor(attributes: PacketAttributes) {
    this.attributes = attributes;
  }

  public static fromBuffer(buffer: Buffer) {
    let attributes: PacketAttributes;

    try {
      let bufferString = buffer.toString();
      bufferString = bufferString.replace(/[\u0000-\u001F\u007F-\u009F]/g, "");
      attributes = JSON.parse(bufferString);
      return new this(attributes);
      console.log(attributes);
    } catch (exception) {
      console.log(exception);
      return new UnknownPacket({ type: "Unknown" });
    }
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

class UnknownPacket extends Packet {}

export default Packet;
