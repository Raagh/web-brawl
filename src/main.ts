import "phaser";

import TestScene from "./scenes/play.scene";

const config: GameConfig = {
  type: Phaser.AUTO,
  parent: "content",
  width: 640,
  height: 480,
  resolution: 1,
  backgroundColor: "#EDEEC9",
  scene: [TestScene]
};

new Phaser.Game(config);
