import Packet from "../../../server/packet";
import State from "../state";

export default class ConnectingToMatch extends State {
  public update() {
    const packet = new Packet({ type: "connection-request" });

    this.client.match?.clients.forEach((client) => {
      this.client.send(packet, client);
    });
  }

  public onPacketReceived(packet: Packet, connection: Connection) {
    switch (packet.type) {
      case "connection-request":
        const clientInMatch = this.client.match.clients.find(
          (client) =>
            client.address === connection.address &&
            client.port === connection.port
        );

        if (clientInMatch) {
          const packet = new Packet({ type: "connection-accepted" });
          this.client.send(packet, connection);
        }
        break;
      case "connection-accepted":
        console.log(
          `[client] match connection accepted from ${connection.address}:${connection.port}`
        );
        break;
    }
  }
}
