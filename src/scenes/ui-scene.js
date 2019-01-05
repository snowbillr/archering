export class UiScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ui' });
  }

  preload() {
    this.load.image('gauge-outline', 'assets/gauge-outline.png');
    this.load.image('gauge-fill', 'assets/gauge-fill.png');

    this.load.image('arrow', 'assets/arrow.png');
  }

  create() {
    this.events.on('shutdown', this._cleanupRegistryListeners, this);

    this.registry.events.on('changedata_lives', this._updateLives, this);
    this.registry.events.on('changedata_charge', this._updateCharge, this);

    this.livesText = this.add.text(30, 15, 'Quiver:');
    this.livesImages = this.add.group([], {
      classType: Phaser.GameObjects.Image,
      key: 'arrow',
      setXY: { x: 120, stepX: 20, y: 22 },
      setRotation: { value: -45 },
      setScale: { x: 0.30, y: 0.30 },
      repeat: 2,
    });

    this.chargeGaugeOutline = this.add.image(30, 40, 'gauge-outline').setOrigin(0).setScale(1, 0.8);
    this.chargeGaugeFill = this.add.image(30, 40, 'gauge-fill').setOrigin(0).setScale(1, 0.8);

    this._updateLives(null, this.registry.get('lives'));
    this._updateCharge(null, this.registry.get('charge'));
  }

  _cleanupRegistryListeners() {
    this.registry.events.off('changedata_lives', this._updateLives, this);
    this.registry.events.off('changedata_charge', this._updateCharge, this);
  }

  _updateLives(parent, value) {
    this.livesImages
      .getChildren()
      .forEach((lifeImage, i) => {
        console.log(i, value);
        if (i < value) {
          lifeImage.visible = true;
        } else {
          lifeImage.visible = false;
        }
      })
  }

  _updateCharge(parent, value) {
    const baseCharge = 200;
    const maxCharge = 700;
    const chargePercent = (value - baseCharge) / (maxCharge - baseCharge);

    this.chargeGaugeFill.scaleX = chargePercent;
  }
}
