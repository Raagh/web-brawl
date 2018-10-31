import "phaser";

export class Player extends Phaser.Physics.Arcade.Sprite {
  public speed: number = 175;
  private _id: any;
  private _oldPosition: { x: number; y: number };

  constructor(
    scene: Phaser.Scene,
    world: Phaser.Tilemaps.StaticTilemapLayer,
    positionX: number,
    positionY: number
  ) {
    super(scene, positionX, positionY, "player");
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, world);
    this.setBounce(0);
    this.setCollideWorldBounds(true);
  }

  public get oldPosition() {
    return this._oldPosition;
  }

  public set oldPosition(position: any) {
    this._oldPosition = position;
  }

  public set id(playerId: any) {
    this._id = playerId;
  }

  public get id() {
    return this._id;
  }

  public moveLeft() {
    this.setVelocityX(-this.speed);
    this.flipX = true;
    this.anims.play("right", true);
  }

  public moveRight() {
    this.setVelocityX(this.speed);
    this.flipX = false;
    this.anims.play("right", true);
  }

  public moveDown() {
    this.setVelocityY(this.speed);
    this.anims.play("down", true);
  }

  public moveUp() {
    this.setVelocityY(-this.speed);
    this.anims.play("up", true);
  }
}
