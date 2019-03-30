import { config } from '../config';

import { RestartLevelButton } from '../entities/restart-button';

const arrowConfig = config.entities.level.arrow;
const uiConfig = config.layouts.ui;

export class UiScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ui' });
  }

  create() {
    this.events.on('shutdown', this._cleanupRegistryListeners, this);

    this.registry.events.on('changedata-remainingArrows', this._updateArrows, this);
    this.registry.events.on('changedata-charge', this._updateCharge, this);

    this.restartButton = new RestartLevelButton(this);

    this.arrowsText = this.add.bitmapText(uiConfig.quiverLabel.x, uiConfig.quiverLabel.y, 'font', 'Quiver:', uiConfig.quiverLabel.size);
    this.arrowsImages = this.add.group([], {
      classType: Phaser.GameObjects.Image,
      key: 'arrow',
      setXY: { x: uiConfig.arrows.x, stepX: uiConfig.arrows.xStep, y: uiConfig.arrows.y },
      setRotation: { value: uiConfig.arrows.rotation },
      setScale: { x: 0.30, y: 0.30 },
      repeat: this.registry.get('remainingArrows') - 1,
    });

    this.chargeText = this.add.bitmapText(uiConfig.chargeLabel.x, uiConfig.chargeLabel.y, 'font', 'Power:', uiConfig.chargeLabel.size);
    this.chargeGaugeOutline = this.add.image(uiConfig.chargeGauge.x, uiConfig.chargeGauge.y, 'gauge-outline').setOrigin(0).setScale(1, 0.8);
    this.chargeGaugeFill = this.add.image(uiConfig.chargeGauge.x, uiConfig.chargeGauge.y, 'gauge-fill').setOrigin(0).setScale(1, 0.8);

    this._updateArrows(null, this.registry.get('remainingArrows'));
    this._updateCharge(null, this.registry.get('charge'));
  }

  _cleanupRegistryListeners() {
    this.registry.events.off('changedata-remainingArrows', this._updateArrows, this);
    this.registry.events.off('changedata-charge', this._updateCharge, this);
  }

  _updateArrows(parent, remainingArrows) {
    this.arrowsImages
      .getChildren()
      .forEach((lifeImage, i) => {
        if (i < remainingArrows) {
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
