import { Player } from "../sprites/player/player.sprite";
import { MainSceneManager } from "./main-scene.manager";
import { PlayerSocketService } from "../services/player-socket.service";

class MainScene extends Phaser.Scene {
  private readonly sceneManager: MainSceneManager;
  private readonly playerSocketService: PlayerSocketService;
  private cursors: any;
  private player: Player;

  constructor() {
    super({
      key: "MainScene"
    });
    this.sceneManager = new MainSceneManager(this, true);
    this.playerSocketService = new PlayerSocketService();
  }

  public preload() {
    this.sceneManager.loadAssets();
  }

  public create() {
    this.playerSocketService.createNewPlayer();
    const world = this.sceneManager.createWorld();
    this.player = new Player(this, world, 500, 500);

    this.cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.startFollow(this.player, false);
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
  }
}

export default MainScene;
