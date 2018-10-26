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
    map.createStaticLayer("Middle", tileset, 0, 0);
    map.createStaticLayer("Top", tileset, 0, 0);
    map.createStaticLayer("UltraTop", tileset, 0, 0);

    this.player = this.physics.add.sprite(500, 500, "player");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player, false);

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
      key: "left",
      frames: this.anims.generateFrameNumbers("player", { start: 18, end: 21 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("player", { start: 1, end: 4 }),
      frameRate: 10,
      repeat: -1
    });
  }

  public update(time: number, delta: number) {
    if (this.cursors.left.isDown) {
      this.player.x -= 5;
      this.player.anims.play("left", true);
    } else if (this.cursors.right.isDown) {
      this.player.x += 5;
      this.player.anims.play("right", true);
    } else if (this.cursors.down.isDown) {
      this.player.y += 5;
      this.player.anims.play("down", true);
    } else if (this.cursors.up.isDown) {
      this.player.y -= 5;
      this.player.anims.play("up", true);
    } else {
      this.player.anims.stop();
    }
  }
}

export default TestScene;
