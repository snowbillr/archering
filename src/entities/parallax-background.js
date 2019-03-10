import Phaser from 'phaser';
import { config } from '../config';

export class ParallaxBackground {
  constructor(scene, backKey, middleKey, frontKey) {
    this.scene = scene;

    this.backgroundBack = scene.add.tileSprite(0, 0, config.dimensions.viewport.width, config.dimensions.viewport.height, backKey);
    this.backgroundBack.setOrigin(0, 0);
    this.backgroundBack.setTileScale(1, 1.35);
    this.backgroundBack.setScrollFactor(0);

    this.backgroundMiddle = scene.add.tileSprite(0, 0, config.dimensions.viewport.width, config.dimensions.viewport.height, middleKey);
    this.backgroundMiddle.setOrigin(0, 0);
    this.backgroundMiddle.setTileScale(1, 1.35);
    this.backgroundMiddle.setScrollFactor(0);

    this.backgroundFront = scene.add.tileSprite(0, 0, config.dimensions.viewport.width, config.dimensions.viewport.height, frontKey);
    this.backgroundFront.setOrigin(0, 0);
    this.backgroundFront.setTileScale(1, 1.35);
    this.backgroundFront.setScrollFactor(0);
  }

  update(scrollAmount) {
    this.backgroundBack.tilePositionX = scrollAmount / 3;
    this.backgroundMiddle.tilePositionX = scrollAmount / 2;
    this.backgroundFront.tilePositionX = scrollAmount;
  }
}
