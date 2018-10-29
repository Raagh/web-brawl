import { PlayerSocketService } from "../services/player-socket.service";
import { PlayerAnimationManager } from "../sprites/player/player.animation-manager";
import { Player } from "../sprites/player/player.sprite";
import { MainSceneManager } from "./main-scene.manager";

export default class MainScene extends Phaser.Scene {
  private readonly sceneManager: MainSceneManager;
  private readonly animationManager: PlayerAnimationManager;
  private playerSocketService: PlayerSocketService;
  private cursors: any;
  private player: Player;
  private otherPlayers: Player[] = [];
  private world: Phaser.Tilemaps.StaticTilemapLayer;

  constructor() {
    super({
      key: "MainScene",
    });
    this.sceneManager = new MainSceneManager(this, true);
    this.playerSocketService = new PlayerSocketService();
    this.animationManager = new PlayerAnimationManager(this);
  }

  public preload() {
    this.sceneManager.loadAssets();
  }

  public create() {
    this.world = this.sceneManager.createWorld();
    this.animationManager.createWalkAnimations();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, this.world, 500, 500);
    this.cameras.main.startFollow(this.player, false);

    this.playerSocketService.connect();
    this.playerSocketService.setupServerListeners(
      players => this.addCurrentPlayers(players),
      playerInfo => this.addOtherPlayer(playerInfo),
      playerInfo => this.movePlayer(playerInfo),
      playerId => this.removeOtherPlayer(playerId)
    );
  }

  public update(time: number, delta: number) {
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.moveLeft();
    } else if (this.cursors.right.isDown) {
      this.player.moveRight();
    } else if (this.cursors.down.isDown) {
      this.player.moveDown();
    } else if (this.cursors.up.isDown) {
      this.player.moveUp();
    } else {
      this.player.anims.stop();
    }
    this.player.body.velocity.normalize().scale(this.player.speed);
    let x = this.player.x;
    let y = this.player.y;
    if (
      this.player.oldPosition &&
      (x !== this.player.oldPosition.x || y !== this.player.oldPosition.y)
    ) {
      this.playerSocketService.movePlayer(this.player.x, this.player.y);
    }
    this.player.oldPosition = { x: this.player.x, y: this.player.y };
  }

  private removeOtherPlayer(playerId: any): any {
    this.otherPlayers.forEach(otherPlayer => {
      if (playerId === otherPlayer.id) {
        otherPlayer.destroy();
      }
    });
  }

  private addCurrentPlayers(players) {
    Object.keys(players).forEach(id => {
      if (players[id].playerId !== this.playerSocketService.getSocketId()) {
        this.addOtherPlayer(players[id]);
      }
    });
  }

  private addOtherPlayer(playerInfo) {
    const otherPlayer = new Player(
      this,
      this.world,
      playerInfo.x,
      playerInfo.y
    );
    otherPlayer.id = playerInfo.playerId;
    this.otherPlayers.push(otherPlayer);
  }

  private movePlayer(playerInfo) {
    this.otherPlayers.forEach(otherPlayer => {
      if (playerInfo.playerId === otherPlayer.id) {
        otherPlayer.setPosition(playerInfo.x, playerInfo.y);
      }
    });
  }
}
