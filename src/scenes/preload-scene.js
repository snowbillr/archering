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

    this.load.image('menu-bg-0', 'assets/menu-bg-0.png');
    this.load.image('menu-bg-1', 'assets/menu-bg-1.png');
    this.load.image('menu-bg-2', 'assets/menu-bg-2.png');
    this.load.image('menu-bg-3', 'assets/menu-bg-3.png');
    this.load.image('menu-bg-4', 'assets/menu-bg-4.png');

    this.load.audio('arrow-release-low', 'assets/sounds/arrow_release_low.wav');
    this.load.audio('arrow-release-medium', 'assets/sounds/arrow_release_medium.wav');
    this.load.audio('arrow-release-high', 'assets/sounds/arrow_release_high.wav');
  }

  create() {
    this.scene.start('level-select')
  }
}
