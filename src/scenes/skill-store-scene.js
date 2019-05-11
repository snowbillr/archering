import { config } from '../config';

export class SkillStoreScene extends Phaser.Scene {
  constructor() {
    super({ key: 'skill-store' });
  }

  create() {
    this._createBackgroundImage('store-bg-0');
    this._createBackgroundImage('store-bg-1');
    this._createBackgroundImage('store-bg-2');
    this._createBackgroundImage('store-bg-3');

    this.add.bitmapText(500, 40, 'font', 'Level Select', 24)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.scene.start('level-select');
      });

    this.add.bitmapText(320, 50, 'font-outline', 'Skill Store', 12)
      .setOrigin(0.5);
  }

  _createBackgroundImage(key) {
    this.add.image(0, 0, key)
      .setDisplaySize(config.dimensions.viewport.width, config.dimensions.viewport.height)
      .setOrigin(0);
  }
}
