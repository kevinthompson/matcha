import dgram from "dgram";
import { PrismaClient } from "@prisma/client";
import Packet from "./packet";

type Server = dgram.Socket;

class PacketHandler {
  public static handle(server: Server, connection: Connection, packet: Packet) {
    const handlerClass = this.handlerFor(packet);
    const handler = new handlerClass();
    handler.handle(server, connection, packet);
  }

  private static handlerFor(packet) {
    return this;
  }

  async handle(server: Server, connection: Connection, packet: Packet) {
    const prisma = new PrismaClient();

    console.log(packet);

    switch (packet.type) {
      case "registration":
        // const client = await prisma.client.findFirst({
        //   where: {
        //     ipAddress: "",
        //     port: "",
        //   },
        // });

        // if (!client) {
        //   const client = await prisma.client.create({
        //     data: {
        //       ipAddress: "",
        //       port: "",
        //     },
        //   });
        // }

        break;
      case "ping":
        const response = new Packet({ type: "pong" });
        server.send(response.toBuffer(), connection.port, connection.address);
        break;
    }
  }
}

export default PacketHandler;
