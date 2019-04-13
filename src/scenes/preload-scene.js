import Phaser from 'phaser';

import { Storage } from '../lib/storage';

import { config } from '../config';

export class PreloadScene extends Phaser.Scene {
  constructor() {
    super({ key: 'preload' });
  }

  preload() {
    this._loadFonts();

    this._loadSharedImages();
    this._loadLevelSelectImages();
    this._loadLevelImages();
    this._loadUiImages();
    this._loadResultsImages();

    this._loadGameSounds();
  }

  create() {
    this._createGameAnimations();

    this._loadSavedStats();

    this.scene.start('level-select')
  }

  _loadFonts() {
    this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');
    this.load.bitmapFont('font-outline', 'assets/fonts/font-outline.png', 'assets/fonts/font-outline.xml');
  }

  _loadSharedImages() {
    this.load.image('star', 'assets/star.png');
    this.load.image('star-gray', 'assets/star-gray.png');

    this.load.image('arrow', 'assets/arrow.png');
  }

  _loadLevelSelectImages() {
    this.load.image('menu-bg-0', 'assets/menu-bg-0.png');
    this.load.image('menu-bg-1', 'assets/menu-bg-1.png');
    this.load.image('menu-bg-2', 'assets/menu-bg-2.png');
    this.load.image('menu-bg-3', 'assets/menu-bg-3.png');
    this.load.image('menu-bg-4', 'assets/menu-bg-4.png');
  }

  _loadLevelImages() {
    this.load.image('background-back', 'assets/background-back.png');
    this.load.image('background-middle', 'assets/background-middle.png');
    this.load.image('background-front', 'assets/background-front.png');

    this.load.image('arrow-glow', 'assets/arrow-glow.png');

    this.load.image('target', 'assets/target.png');

    this.load.image('balloon-1', 'assets/balloon/1.png');
    this.load.image('balloon-2', 'assets/balloon/2.png');
    this.load.image('balloon-3', 'assets/balloon/3.png');
    this.load.image('balloon-4', 'assets/balloon/4.png');
    this.load.image('balloon-5', 'assets/balloon/5.png');
    this.load.image('balloon-6', 'assets/balloon/6.png');
    this.load.image('balloon-string', 'assets/balloon/string.png');
  }

  _loadUiImages() {
    this.load.image('gauge-outline', 'assets/gauge-outline.png');
    this.load.image('gauge-fill', 'assets/gauge-fill.png');

    this.load.image('gold-1', 'assets/gold-1.png');
    this.load.image('gold-2', 'assets/gold-2.png');
    this.load.image('gold-3', 'assets/gold-3.png');
    this.load.image('gold-4', 'assets/gold-4.png');
    this.load.image('gold-5', 'assets/gold-5.png');
  }

  _loadResultsImages() {
    this.load.image('background-parchment', 'assets/background-parchment.png');
  }

  _loadGameSounds() {
    this.load.audio('arrow-release-low', 'assets/sounds/arrow_release_low.wav');
    this.load.audio('arrow-release-medium', 'assets/sounds/arrow_release_medium.wav');
    this.load.audio('arrow-release-high', 'assets/sounds/arrow_release_high.wav');

    this.load.audio('balloon-pop', 'assets/sounds/balloon_pop.wav');
  }

  _createGameAnimations() {
    this.anims.create({
      key: 'balloon-pop',
      frames: [
        { key: 'balloon-1' },
        { key: 'balloon-2' },
        { key: 'balloon-3' },
        { key: 'balloon-4' },
        { key: 'balloon-5' },
        { key: 'balloon-6' },
      ],
    });
  }

  _loadSavedStats() {
    const storage = new Storage();

    this.registry.set(config.registryKeys.gold, storage.loadGold());
  }
}
