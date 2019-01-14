import Phaser from 'phaser';

import levels from '../levels.json';

export class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'level-select' });
  }

  create() {
    this.events.once('shutdown', this._shutdown);

    this._createLevelButton(320, 150, 0);
    this._createLevelButton(320, 200, 1);
  }

  _createLevelButton(x, y, levelIndex) {
    this.add.text(x, y, `Level ${levelIndex + 1}`, {
      fill: '#000',
      backgroundColor: '#6c6',
      padding: 6,
    }).setOrigin(0.5, 0)
      .setInteractive({ cursor: 'pointer' })
      .once('pointerup', () => this.scene.start('game', { level: levels[levelIndex] }));
  }

  _shutdown() {
    console.log('shutdown');
  }
}
