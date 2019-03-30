import Phaser from 'phaser';

import { config } from '../config';

import levels from '../levels.json';

import { Storage } from '../lib/storage';

export class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'level-select' });
  }

  create() {
    this.storage = new Storage();

    this._createBackgroundImage('menu-bg-0');
    this._createBackgroundImage('menu-bg-1');
    this._createBackgroundImage('menu-bg-2');
    this._createBackgroundImage('menu-bg-3');
    this._createBackgroundImage('menu-bg-4');

    this.add.bitmapText(320, 50, 'font-outline', 'Level Select', 12)
      .setOrigin(0.5);

    const buttonXStep = 120;
    for (let i = 0; i < levels.length; i++) {
      this._createLevelButton(i, 100 + (buttonXStep * i), 150);
    }
  }

  _createBackgroundImage(key) {
    this.add.image(0, 0, key)
      .setDisplaySize(config.dimensions.viewport.width, config.dimensions.viewport.height)
      .setOrigin(0);
  }

  _createLevelButton(levelIndex, x, y) {
    const levelText = levelIndex;
    const starCount = this.storage.loadLevelStars(levelIndex);

    this.add.bitmapText(x + 28, y, 'font', levelText, 28)
      .setOrigin(0.5, 0)

    const starXStep = 28;
    for (let i = 0; i < 3; i++) {
      const starAsset = i < starCount ? 'star' : 'star-gray';
      this.add.image(x + (starXStep * i), y + 30, starAsset)
        .setOrigin(0.5, 0)
        .setDisplaySize(24, 24);
    }

    this.add.zone(x - 14, y, 80, 54)
      .setOrigin(0, 0)
      .setInteractive({ cursor: 'pointer' })
      .once('pointerup', () => {
        this.registry.set('levelIndex', levelIndex);
        this.scene.start('level', { levelConfig: levels[levelIndex] });
      });
  }
}
