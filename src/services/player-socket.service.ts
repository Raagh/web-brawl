import "phaser";

import { SocketsService } from "./sockets.service";

export class PlayerSocketService {
  private readonly socketService: SocketsService;

  constructor() {
    this.socketService = SocketsService.getInstance();
  }

  public movePlayer(positionX: number, positionY: number) {
    this.socketService.sendWithValues("playerMovement", {
      x: positionX,
      y: positionY
    });
  }
}
