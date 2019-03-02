import Phaser from 'phaser';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload' });
  }

  preload() {
    this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');
    this.load.bitmapFont('font-outline', 'assets/fonts/font-outline.png', 'assets/fonts/font-outline.xml');

    this.load.image('star', 'assets/star.png');
    this.load.image('star-gray', 'assets/star-gray.png');

    this.load.image('background-back', 'assets/background-back.png');
    this.load.image('background-middle', 'assets/background-middle.png');
    this.load.image('background-front', 'assets/background-front.png');
  }

  create() {
    this.scene.start('level-select')
  }
}
