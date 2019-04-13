import { config } from '../config';

import { RestartLevelButton } from '../entities/restart-level-button';

const arrowConfig = config.entities.level.arrow;
const uiConfig = config.layouts.ui;

export class UiScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ui' });
  }

  create() {
    this.events.on('shutdown', this._cleanupRegistryListeners, this);

    this.registry.events.on(`changedata-${config.registryKeys.level.remainingArrows}`, this._updateArrows, this);
    this.registry.events.on(`changedata-${config.registryKeys.level.arrow.charge}`, this._updateCharge, this);
    this.registry.events.on(`changedata-${config.registryKeys.level.gold}`, this._updateLevelGold, this);

    this.add.image(uiConfig.background.x, uiConfig.background.y, 'background-parchment')
      .setDisplaySize(uiConfig.background.width, uiConfig.background.height)
      .setOrigin(0, 0)

    this.restartButton = new RestartLevelButton(this);

    this.arrowsText = this.add.bitmapText(uiConfig.quiverLabel.x, uiConfig.quiverLabel.y, 'font', 'Quiver:', uiConfig.quiverLabel.size);
    this.arrowsImages = this.add.group([], {
      classType: Phaser.GameObjects.Image,
      key: 'arrow',
      setXY: { x: uiConfig.arrows.x, stepX: uiConfig.arrows.xStep, y: uiConfig.arrows.y },
      setRotation: { value: uiConfig.arrows.rotation },
      setScale: { x: 0.30, y: 0.30 },
      repeat: this.registry.get(config.registryKeys.level.remainingArrows) - 1,
    });

    this.chargeText = this.add.bitmapText(uiConfig.chargeLabel.x, uiConfig.chargeLabel.y, 'font', 'Power:', uiConfig.chargeLabel.size);
    this.chargeGaugeOutline = this.add.image(uiConfig.chargeGauge.x, uiConfig.chargeGauge.y, 'gauge-outline')
      .setOrigin(0)
      .setDisplaySize(128, 20);
    this.chargeGaugeFill = this.add.image(uiConfig.chargeGauge.x, uiConfig.chargeGauge.y, 'gauge-fill')
      .setOrigin(0)
      .setDisplaySize(128, 20);

    this.goldIcon = this.add.image(uiConfig.goldIcon.x, uiConfig.goldIcon.y, 'gold-5')
      .setDisplaySize(uiConfig.goldIcon.width, uiConfig.goldIcon.height)
      .setOrigin(0, 1);
    this.goldText = this.add.bitmapText(uiConfig.goldText.x, uiConfig.goldText.y, 'font', 0, uiConfig.goldText.size)
      .setOrigin(0, 1);

    this._updateArrows(null, this.registry.get(config.registryKeys.level.remainingArrows));
    this._updateCharge(null, this.registry.get(config.registryKeys.level.arrow.charge));
    this._updateLevelGold(null);
  }

  _cleanupRegistryListeners() {
    this.registry.events.off(`changedata-${config.registryKeys.level.remainingArrows}`, this._updateArrows, this);
    this.registry.events.off(`changedata-${config.registryKeys.level.arrow.charge}`, this._updateCharge, this);
    this.registry.events.off(`changedata-${config.registryKeys.level.gold}`, this._updateLevelGold, this);
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

  _updateLevelGold(parent, newLevelGold = 0, oldLevelGold = 0) {
    const baseGold = this.registry.get(config.registryKeys.gold);
    const lastLevelGold = baseGold + oldLevelGold;
    const updatedLevelGold = baseGold + newLevelGold;

    this.tweens.add({
      targets: [{ value: lastLevelGold}],
      props: { value: updatedLevelGold },
      duration: 300,
      onUpdate: tween => {
        this.goldText.setText(Phaser.Math.RoundTo(tween.getValue()));
      }
    });
  }
}
