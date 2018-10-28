import "phaser";

import MainScene from "./main/main.scene";

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
  scene: [MainScene]
};

const game = new Phaser.Game(config);
