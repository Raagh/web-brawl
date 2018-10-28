import { Player } from "../sprites/player/player.sprite";
import { MainSceneManager } from "./main-scene.manager";

class MainScene extends Phaser.Scene {
  private sceneManager: MainSceneManager;
  private player: Player;
  private cursors: any;
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
