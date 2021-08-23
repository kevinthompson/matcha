import Packet from "../server/packet";
import { createSocket, Socket } from "dgram";
import Idle from "./client/state/idle";
import LookingForMatch from "./client/state/lookingForMatch";
import State from "./client/state";

export default class Client {
  public address: string;
  public port: number;
  public server: Connection;
  public socket: Socket;
  public state: State;

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
      console.log(`[client] message received from ${remote_address}.`);
      this.state.onPacketReceived(packet, connection);
    });

    this.socket.on("error", this.state.onSocketError);
    this.socket.bind(this.port);
  }

  public transitionTo(state: new (...args: any[]) => State) {
    console.log(`[client] changing state to ${state.name}`);
    this.state = new state(this);
  }
}
