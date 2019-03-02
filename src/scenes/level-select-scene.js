import Phaser from 'phaser';

import levels from '../levels.json';

import { Storage } from '../lib/storage';

export class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'level-select' });
  }

  create() {
    this.storage = new Storage();

    this.add.image(0, 0, 'background-back')
      .setDisplaySize(640, 300)
      .setOrigin(0);
    this.add.image(0, 0, 'background-middle')
      .setDisplaySize(640, 300)
      .setOrigin(0);

    this.add.bitmapText(320, 50, 'font-outline', 'Level Select', 12)
      .setOrigin(0.5);

    const buttonXStep = 120;
    for (let i = 0; i < levels.length; i++) {
      this._createLevelButton(i, 100 + (buttonXStep * i), 150);
    }
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

    this.add.zone(x, y, 80, 54)
      .setOrigin(0, 0)
      .setInteractive({ cursor: 'pointer' })
      .once('pointerup', () => {
        this.registry.set('levelIndex', levelIndex);
        this.scene.start('game', { level: levels[levelIndex] });
      });
  }
}
