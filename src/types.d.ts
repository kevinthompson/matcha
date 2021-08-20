interface Connection {
  address: string;
  family: "IPv4" | "IPv6";
  port: number;
  size: number;
}

interface PacketAttributes {
  type: string;
  data?: object;
}
