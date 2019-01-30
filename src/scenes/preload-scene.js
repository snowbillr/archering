import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload' });
  }

  preload() {
    this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');
  }

  create() {
    this.scene.start('level-select')
  }
}
