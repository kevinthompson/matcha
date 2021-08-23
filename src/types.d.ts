interface Connection {
  address: string;
  family?: "IPv4" | "IPv6";
  port: number;
  size?: number;
}

interface Match {
  id: string;
  clients: [Connection];
}

interface PacketAttributes {
  type: string;
  data?: {
    match?: {
      id: string;
      clients: Connection[];
    };
  };
}
