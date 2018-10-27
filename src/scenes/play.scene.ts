import { Game } from "phaser";

class TestScene extends Phaser.Scene {
  private player: Phaser.Physics.Arcade.Sprite;
  private cursors: any;
  constructor() {
    super({
      key: "TestScene"
    });
  }

  public preload() {
    this.load.tilemapTiledJSON("map", "/assets/maps/test_map.json");
    this.load.image("tiles", "/assets/images/tilesheet.png");
    this.load.spritesheet("player", "/assets/images/player.png", {
      frameWidth: 64,
      frameHeight: 64
    });
  }

  public create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("Tilesheet", "tiles");

    map.createStaticLayer("Bottom", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("Middle", tileset, 0, 0);
    map.createStaticLayer("Top", tileset, 0, 0);
    const aboveLayer = map.createStaticLayer("UltraTop", tileset, 0, 0);
    worldLayer.setCollisionByProperty({ collides: true });
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    worldLayer.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255)
    });

    aboveLayer.setDepth(10);
    this.player = this.physics.add.sprite(500, 500, "player");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, worldLayer.width, worldLayer.height);
    this.cameras.main.startFollow(this.player, false);
    this.player.setCollideWorldBounds(true);

    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("player", { start: 12, end: 17 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("player", { start: 6, end: 11 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1
    });
    // Bindeo del player a la layer para chequear si collisionan (chequeo por frame)
    this.physics.add.collider(this.player, worldLayer);
  }

  public update(time: number, delta: number) {
    const speed = 175;
    this.player.setVelocity(0);
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      this.player.flipX = true;
      this.player.anims.play("right", true);
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      this.player.flipX = false;
      this.player.anims.play("right", true);
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      this.player.anims.play("down", true);
    } else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      this.player.anims.play("up", true);
    } else {
      this.player.anims.stop();
    }

    this.player.body.velocity.normalize().scale(speed);
  }
}

export default TestScene;
