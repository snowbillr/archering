import 'phaser';

import { GameScene } from './scenes/game-scene';
import { UiScene } from './scenes/ui-scene';
import { ResultsScene } from './scenes/results-scene';

const gameConfig = {
  width: 640,
  height: 300,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 400,
      }
    }
  },
  scene: [GameScene, UiScene, ResultsScene],
};

new Phaser.Game(gameConfig);
