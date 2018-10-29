import "phaser";

import { SocketsService } from "./sockets.service";
export class PlayerSocketService {
  private socketService: SocketsService;

  public connect() {
    this.socketService = SocketsService.getInstance();
  }

  public setupServerListeners(
    currentPlayersCallback,
    newPlayerCallback,
    playerMovedCallback,
    disconnectCallback
  ) {
    this.socketService.listen("currentPlayers", currentPlayersCallback);
    this.socketService.listen("newPlayer", newPlayerCallback);
    this.socketService.listen("playerMoved", playerMovedCallback);
    this.socketService.listen("disconnect", disconnectCallback);
  }

  public movePlayer(positionX: number, positionY: number) {
    this.socketService.sendWithValues("playerMovement", {
      x: positionX,
      y: positionY,
    });
  }

  public getSocketId() {
    return this.socketService.getId();
  }
}
