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
    disconnectCallback,
    directionCallback,
  ) {
    this.socketService.listen("currentPlayers", currentPlayersCallback);
    this.socketService.listen("newPlayer", newPlayerCallback);
    this.socketService.listen("disconnect", disconnectCallback);
    this.socketService.listen("playerDirectionChanged", directionCallback);
  }

  public movePlayer(positionX: number, positionY: number) {
    this.socketService.sendWithValues("playerMovement", {
      x: positionX,
      y: positionY,
    });
  }

  public movePlayerDirection(direction : string) {
    this.socketService.sendWithValues("playerDirection", direction);
  }

  public getSocketId() {
    return this.socketService.getId();
  }
}
