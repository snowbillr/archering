import 'phaser';

import { GameScene } from './scenes/game-scene';
import { UiScene } from './scenes/ui-scene';

import { LevelSelectScene } from './scenes/level-select-scene';

import { ResultsScene } from './scenes/results-scene';

const gameConfig = {
  width: 640,
  height: 300,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      x: 0,
      y: 0,
      width: 1500,
      height: 300,
      gravity: {
        y: 400,
      }
    }
  },
  scene: [LevelSelectScene, GameScene, UiScene, ResultsScene],
};

new Phaser.Game(gameConfig);
