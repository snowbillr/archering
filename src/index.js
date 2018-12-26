import 'phaser';

import { GameScene } from './scenes/game-scene';
import { UiScene } from './scenes/ui-scene';

const gameConfig = {
  width: 640,
  height: 480,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 400,
      }
    }
  },
  scene: [GameScene, UiScene],
};

new Phaser.Game(gameConfig);
