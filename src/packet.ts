class Packet {
  type: string;
  data: object;

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

    return new this(attributes);
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
