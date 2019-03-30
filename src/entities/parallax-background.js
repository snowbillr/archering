import { config } from '../config';

export class ParallaxBackground {
  constructor(scene, backKey, middleKey, frontKey) {
    this.backgroundBack = this._addBackground(scene, backKey);
    this.backgroundMiddle = this._addBackground(scene, middleKey);
    this.backgroundFront = this._addBackground(scene, frontKey);
  }

  update(scrollAmount) {
    this.backgroundBack.tilePositionX = scrollAmount / 3;
    this.backgroundMiddle.tilePositionX = scrollAmount / 2;
    this.backgroundFront.tilePositionX = scrollAmount;
  }

  _addBackground(scene, key) {
    const displayWidth = config.layouts.level.background.width;
    const displayHeight = config.layouts.level.background.height;

    const bgHeight = scene.textures.get(key).get().height;
    const heightScaleFactor = 1 + ((displayHeight - bgHeight) / displayHeight);

    const bg = scene.add.tileSprite(0, 0, displayWidth, displayHeight, key);
    bg.tileScaleY = heightScaleFactor;
    bg.setOrigin(0, 0);
    bg.setScrollFactor(0);

    return bg;
  }
}
