import Phaser from 'phaser';

export class ParallaxBackground {
  constructor(scene, backKey, middleKey, frontKey) {
    this.scene = scene;

    this.backgroundBack = scene.add.tileSprite(0, 0, 640, 300, backKey);
    this.backgroundBack.setOrigin(0, 0);
    this.backgroundBack.setTileScale(1, 1.35);
    this.backgroundBack.setScrollFactor(0);

    this.backgroundMiddle = scene.add.tileSprite(0, 0, 640, 300, middleKey);
    this.backgroundMiddle.setOrigin(0, 0);
    this.backgroundMiddle.setTileScale(1, 1.35);
    this.backgroundMiddle.setScrollFactor(0);

    this.backgroundFront = scene.add.tileSprite(0, 0, 640, 300, frontKey);
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
