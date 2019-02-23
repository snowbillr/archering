import Phaser from 'phaser';

import levels from '../levels.json';

import { Storage } from '../lib/storage';

export class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'level-select' });
  }

  create() {
    this.storage = new Storage();

    this.add.bitmapText(320, 50, 'font', 'Level Select', 38)
      .setOrigin(0.5);

    const levelButtons = [];
    for (let i = 0; i < levels.length; i++) {
      levelButtons.push(this._createLevelButton(i));
    }

    Phaser.Actions.GridAlign(levelButtons, {
      width: 8,
      height: -1,
      cellWidth: 60,
      cellHeight: 20,
      x: 200,
      y: 150,
    });
  }

  _createLevelButton(levelIndex) {
    const text = `${levelIndex + 1}: ${this.storage.loadLevelScore(levelIndex)}`
    return this.add.bitmapText(50, 50, 'font', text, 28)
      .setOrigin(0.5, 0)
      .setInteractive({ cursor: 'pointer' })
      .once('pointerup', () => {
        this.registry.set('levelIndex', levelIndex);
        this.scene.start('game', { level: levels[levelIndex] })
      });
  }
}
