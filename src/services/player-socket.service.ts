import "phaser";

import { SocketsService } from "./sockets.service";
export class PlayerSocketService {
  private readonly socketService: SocketsService;
  private mainScene : Phaser.Scene;
  constructor(scene : Phaser.Scene) {
    this.socketService = SocketsService.getInstance();
    this.mainScene = scene;
    this.listenToServer('currentPlayers', (players) => {
      Object.keys(players).forEach((id) => {
        if(players[id].playerId !== this.getSocketId()) {
          this.mainScene.addOtherPlayer(players[id]);
        }
      });
    });
  }

  public movePlayer(positionX: number, positionY: number) {
    this.socketService.sendWithValues("playerMovement", {
      x: positionX,
      y: positionY
    });
  }

  public listenToServer(message : string, callback : (arg : any) => any) {
    this.socketService.listen(message, callback);
  }

  public getSocketId() {
    return this.socketService.getId();
  }
}
