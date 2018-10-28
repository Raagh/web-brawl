export class AnimationProperties {
  public animationKey: string;
  public framesKey: string;
  public startFrame: number;
  public endFrame: number;
  public frameRate: number;

  constructor(
    animationKey: string,
    framesKey: string,
    startFrame: number,
    endFrame: number,
    frameRate: number
  ) {
    this.animationKey = animationKey;
    this.framesKey = framesKey;
    this.startFrame = startFrame;
    this.endFrame = endFrame;
    this.frameRate = frameRate;
  }
}
