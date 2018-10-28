import "phaser";
import { AnimationProperties } from "../../shared/animation-properties.model";

export class PlayerAnimationManager {
  private readonly scene: Phaser.Scene;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  public createWalkAnimations() {
    this.createAnimation(new AnimationProperties("down", "player", 12, 17, 10));
    this.createAnimation(new AnimationProperties("up", "player", 6, 11, 10));
    this.createAnimation(new AnimationProperties("right", "player", 1, 4, 10));
  }

  private createAnimation(animationProperties: AnimationProperties) {
    this.scene.anims.create({
      key: animationProperties.animationKey,
      frames: this.scene.anims.generateFrameNumbers(
        animationProperties.framesKey,
        {
          start: animationProperties.startFrame,
          end: animationProperties.endFrame
        }
      ),
      frameRate: animationProperties.frameRate,
      repeat: -1
    });
  }
}
