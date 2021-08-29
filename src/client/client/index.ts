import Packet from "../../server/packet";
import { createSocket, Socket } from "dgram";
import Idle from "./state/idle";
import ConnectingToMatch from "./state/connectingToMatch";
import LookingForMatch from "./state/lookingForMatch";
import State from "./state";

export default class Client {
  public match: Match;
  public server: Connection;

  private address: string;
  private port: number;
  private socket: Socket;
  private state: State;

  constructor({ port, server }: { port: number; server: Connection }) {
    this.port = port;
    this.server = server;
    this.transitionTo(Idle);
  }

  public update() {
    this.state.update();
  }

  public requestMatch() {
    this.transitionTo(LookingForMatch);
  }

  public connectToMatch(match: Match) {
    this.match = match;
    this.transitionTo(ConnectingToMatch);
  }

  public init(callback = () => {}) {
    this.socket = createSocket("udp4");
    this.socket.on("listening", () => {
      const connection = this.socket.address();

      this.address = connection.address;
      this.port = connection.port;

      console.log(
        `[client] listening: ${connection.address}:${connection.port}`
      );

      callback();
    });

    this.socket.on("message", (buffer: Buffer, connection: Connection) => {
      const packet = Packet.fromBuffer(buffer);
      const remote_address = `${connection.address}:${connection.port}`;
      console.log(
        `[client] received ${packet.type} packet from ${remote_address}.`
      );
      this.state.onPacketReceived(packet, connection);
    });

    this.socket.on("error", (error) => {
      console.log(`[client] error:\n${error.stack}`);
      this.socket.close();
    });

    this.socket.bind(this.port);
  }

  public transitionTo(state: new (...args: any[]) => State) {
    console.log(`[client] changing state to ${state.name}`);
    this.state = new state(this);
  }

  public send(packet: Packet, connection: Connection) {
    console.log(
      `[client] sending ${packet.type} packet to ${connection.address}:${connection.port}`
    );
    this.socket.send(packet.toBuffer(), connection.port, connection.address);
  }
}
