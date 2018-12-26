export class UiScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ui' });
  }

  create() {
    this.events.on('shutdown', this._cleanupRegistryListeners, this);

    this.scoreText = this.add.text(50, 50, 'test');
    this.livesText = this.add.text(50, 75, 'test');

    this._updateScoreText(null, this.registry.get('score'));
    this._updateLivesText(null, this.registry.get('lives'));

    this.registry.events.on('changedata_score', this._updateScoreText, this);
    this.registry.events.on('changedata_lives', this._updateLivesText, this);
  }

  _cleanupRegistryListeners() {
    this.registry.events.off('changedata_score', this._updateScoreText, this);
    this.registry.events.off('changedata_lives', this._updateLivesText, this);
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
}
