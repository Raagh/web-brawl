import io from "socket.io-client";

const SERVER_URL = "http://localhost:8081";

export class SocketsService {
  public static getInstance() {
    if (this.instance == null) {
      return new SocketsService();
    } else {
      return this.instance;
    }
  }
  private static instance: SocketsService;

  public socket: SocketIOClient.Socket;

  private constructor() {
    this.socket = io(SERVER_URL);
  }

  public send(message: string) {
    this.socket.emit(message);
  }

  public sendWithValues(message: string, data: any) {
    this.socket.emit(message, data);
  }

  public listen(message: string, callback: (args : any) => any) {
    this.socket.on(message, callback);
  }

  public getId() {
    return this.socket.id;
  }
}
