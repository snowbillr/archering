import { config } from '../config';

const arrowConfig = config.layouts.game.arrow;

export class UiScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ui' });
  }

  create() {
    this.events.on('shutdown', this._cleanupRegistryListeners, this);

    this.registry.events.on('changedata-arrows', this._updateArrows, this);
    this.registry.events.on('changedata-charge', this._updateCharge, this);

    this.arrowsText = this.add.bitmapText(30, 15, 'font', 'Quiver:', 24);
    this.arrowsImages = this.add.group([], {
      classType: Phaser.GameObjects.Image,
      key: 'arrow',
      setXY: { x: 120, stepX: 20, y: 22 },
      setRotation: { value: -45 },
      setScale: { x: 0.30, y: 0.30 },
      repeat: 2,
    });

    this.chargeGaugeOutline = this.add.image(30, 40, 'gauge-outline').setOrigin(0).setScale(1, 0.8);
    this.chargeGaugeFill = this.add.image(30, 40, 'gauge-fill').setOrigin(0).setScale(1, 0.8);

    this._updateArrows(null, this.registry.get('arrows'));
    this._updateCharge(null, this.registry.get('charge'));
  }

  _cleanupRegistryListeners() {
    this.registry.events.off('changedata-arrows', this._updateArrows, this);
    this.registry.events.off('changedata-charge', this._updateCharge, this);
  }

  _updateArrows(parent, value) {
    this.arrowsImages
      .getChildren()
      .forEach((lifeImage, i) => {
        if (i < value) {
          lifeImage.visible = true;
        } else {
          lifeImage.visible = false;
        }
      })
  }

  _updateCharge(parent, value) {
    const minCharge = arrowConfig.minCharge;
    const maxCharge = arrowConfig.maxCharge;
    const chargePercent = (value - minCharge) / (maxCharge - minCharge);

    this.chargeGaugeFill.scaleX = chargePercent;
  }
}
