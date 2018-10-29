import { PlayerSocketService } from "../services/player-socket.service";
import { Player } from "../sprites/player/player.sprite";
import { MainSceneManager } from "./main-scene.manager";

class MainScene extends Phaser.Scene {
  private readonly sceneManager: MainSceneManager;
  private playerSocketService: PlayerSocketService;
  private cursors: any;
  private player: Player;
  private otherPlayers : Phaser.Physics.Arcade.Group;
  private world : Phaser.Tilemaps.StaticTilemapLayer;

  constructor() {
    super({
      key: "MainScene"
    });
    this.sceneManager = new MainSceneManager(this, true);
    
  }

  public preload() {
    this.sceneManager.loadAssets();
  }

  public create() {
    this.world = this.sceneManager.createWorld();
    this.otherPlayers = this.physics.add.group(); 
    this.playerSocketService = new PlayerSocketService(this);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.player = new Player(this, this.world, 500, 500);

    this.playerSocketService.listenToServer('newPlayer', (playerInfo) => {
      this.addOtherPlayer(playerInfo);
    });

    this.playerSocketService.listenToServer('disconnect', (playerId) => {
      this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if(playerId === otherPlayer.getPlayerId()) {
          otherPlayer.destroy();
        }
      });
    });

    this.playerSocketService.listenToServer('playerMoved', (playerInfo) => {
      this.otherPlayers.getChildren().forEach((otherPlayer) => {
        if(playerInfo.playerId === otherPlayer.getPlayerId()) {
          otherPlayer.setPosition(playerInfo.x, playerInfo.y);
        }
      });
    });
    this.cameras.main.startFollow(this.player, false);
  }

  public addOtherPlayer(playerInfo) {
    const otherPlayer = new Player(this, this.world, playerInfo.x, playerInfo.y);
    otherPlayer.setPlayerId(playerInfo.playerId);
    this.otherPlayers.add(otherPlayer);
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
    if(this.player.getOldPosition() && (x !== this.player.getOldPosition().x || y !== this.player.getOldPosition().y)) {
      this.playerSocketService.movePlayer(this.player.x, this.player.y);
    }
    this.player.setOldPosition(this.player.x, this.player.y);
  }
}

export default MainScene;
