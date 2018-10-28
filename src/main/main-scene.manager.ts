import "phaser";
import { ISceneManager } from "../shared/iscene-manager.interface";

export class MainSceneManager implements ISceneManager {
  private readonly scene: Phaser.Scene;
  private readonly debugCollision: boolean;

  constructor(scene: Phaser.Scene, debugCollision: boolean) {
    this.scene = scene;
    this.debugCollision = debugCollision;
  }

  public loadAssets() {
    this.scene.load.tilemapTiledJSON("map", "/assets/maps/test_map.json");
    this.scene.load.image("tiles", "/assets/images/tilesheet.png");
    this.scene.load.spritesheet("player", "/assets/images/player.png", {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  public createWorld() {
    const map = this.scene.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("Tilesheet", "tiles");
    map.createStaticLayer("Bottom", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("Middle", tileset, 0, 0);
    map.createStaticLayer("Top", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("UltraTop", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });
    aboveLayer.setDepth(10);
    this.scene.cameras.main.setBounds(
      0,
      0,
      worldLayer.width,
      worldLayer.height
    );
    if (this.debugCollision) {
      this.enableColissionDebugging(worldLayer);
    }
    return worldLayer;
  }

  private enableColissionDebugging(
    worldLayer: Phaser.Tilemaps.StaticTilemapLayer
  ) {
    const debugGraphics = this.scene.add.graphics().setAlpha(0.75);
    worldLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    });
  }
}
