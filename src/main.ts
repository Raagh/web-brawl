import "phaser";

import TestScene from "./scenes/play.scene";

const config: GameConfig = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade"
  },
  parent: "content",
  width: 1000,
  height: 1000,
  resolution: 1,
  backgroundColor: "#EDEEC9",
  render: {
    pixelArt: true,
    roundPixels: true
  },
  scene: [TestScene]
};

new Phaser.Game(config);
