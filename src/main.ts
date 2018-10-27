import "phaser";

import TestScene from "./scenes/play.scene";

const config: GameConfig = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 }
    }
  },
  parent: "content",
  width: 968,
  height: 968,
  resolution: 1,
  backgroundColor: "#EDEEC9",
  render: {
    pixelArt: true,
    roundPixels: true
  },
  scene: [TestScene]
};
new Phaser.Game(config);
