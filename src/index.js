import 'phaser';

import { config } from './config';

import { ArcadeHitboxPlugin } from './lib/arcade-hitbox';

import { TestScene } from './scenes/test-scene';

import { PreloadScene } from './scenes/preload-scene';

import { LevelScene } from './scenes/level-scene';
import { UiScene } from './scenes/ui-scene';
import { LevelSelectScene } from './scenes/level-select-scene';
import { SkillStoreScene } from './scenes/skill-store-scene';
import { ResultsScene } from './scenes/results-scene';

const gameConfig = {
  width: config.dimensions.viewport.width,
  height: config.dimensions.viewport.height,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      x: 0,
      y: 0,
      width: config.dimensions.world.width,
      height: config.dimensions.world.height,
      gravity: {
        y: 400,
      },
      checkCollision: { up: false, down: true, left: true, right: true },
    }
  },
  plugins: {
    scene: [
      {
        key: 'arcadeHitboxPlugin',
        plugin: ArcadeHitboxPlugin,
        mapping: 'arcadeHitbox' }
    ]
  },
  scene: [PreloadScene, LevelSelectScene, SkillStoreScene, LevelScene, UiScene, ResultsScene],
};

new Phaser.Game(gameConfig);
