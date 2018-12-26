import 'phaser';

import { GameScene } from './scenes/simple-scene';

const gameConfig = {
  width: 640,
  height: 480,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 400,
      }
    }
  },
  scene: GameScene,
};

new Phaser.Game(gameConfig);
