import Phaser from 'phaser';

import levels from '../levels.json';

export class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'level-select' });
  }

  preload() {

  }

  create() {
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
    return this.add.bitmapText(50, 50, 'font', levelIndex, 28)
      .setOrigin(0.5, 0)
      .setInteractive({ cursor: 'pointer' })
      .once('pointerup', () => this.scene.start('game', { level: levels[levelIndex] }));
  }
}
