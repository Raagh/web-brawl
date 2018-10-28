import "phaser";

import { PlayerAnimationManager } from "./player.animation-manager";

export class Player extends Phaser.Physics.Arcade.Sprite {
  public speed: number = 175;
  private readonly animationManager: PlayerAnimationManager;

  constructor(
    scene: Phaser.Scene,
    world: Phaser.Tilemaps.StaticTilemapLayer,
    positionX: number,
    positionY: number
  ) {
    super(scene, positionX, positionY, "player");
    this.animationManager = new PlayerAnimationManager(scene);
    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(this, world);
    this.setCollideWorldBounds(true);
    this.animationManager.createWalkAnimations();
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
