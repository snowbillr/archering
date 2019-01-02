export class UiScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ui' });
  }

  preload() {
    this.load.image('gauge-outline', 'assets/gauge-outline.png');
    this.load.image('gauge-fill', 'assets/gauge-fill.png');
  }

  create() {
    this.events.on('shutdown', this._cleanupRegistryListeners, this);

    this.registry.events.on('changedata_score', this._updateScoreText, this);
    this.registry.events.on('changedata_lives', this._updateLivesText, this);
    this.registry.events.on('changedata_charge', this._updateChargeGauge, this);

    this.scoreText = this.add.text(30, 15, '');
    this.livesText = this.add.text(30, 40, '');
    this.chargeGaugeOutline = this.add.image(150, 15, 'gauge-outline').setOrigin(0).setScale(1, 0.8);
    this.chargeGaugeFill = this.add.image(150, 15, 'gauge-fill').setOrigin(0).setScale(1, 0.8);

    this._updateScoreText(null, this.registry.get('score'));
    this._updateLivesText(null, this.registry.get('lives'));
    this._updateChargeGauge(null, this.registry.get('charge'));
  }

  _cleanupRegistryListeners() {
    this.registry.events.off('changedata_score', this._updateScoreText, this);
    this.registry.events.off('changedata_lives', this._updateLivesText, this);
    this.registry.events.off('changedata_charge', this._updateChargeGauge, this);
  }

  _updateScoreText(parent, value, previousValue) {
    this.tweens.addCounter({
      from: previousValue || 0,
      to: value,
      duration: 500,
      onUpdate: tween => {
        const roundedValue = Phaser.Math.RoundTo(tween.targets[0].value)
        this.scoreText.text = `Score: ${roundedValue}`;
      }
    })
  }

  _updateLivesText(parent, value) {
    this.livesText.text = `Lives: ${value}`;
  }

  _updateChargeGauge(parent, value) {
    const baseCharge = 200;
    const maxCharge = 700;
    const chargePercent = (value - baseCharge) / (maxCharge - baseCharge);

    this.chargeGaugeFill.scaleX = chargePercent;
  }
}
