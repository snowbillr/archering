export class UiScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ui' });
  }

  create() {
    this.scoreText = this.add.text(50, 50, '');
    this.livesText = this.add.text(50, 75, '');

    this._updateScoreText(null, this.registry.get('score'));
    this._updateLivesText(null, this.registry.get('lives'));

    this.registry.events.on('changedata_score', this._updateScoreText, this);
    this.registry.events.on('changedata_lives', this._updateLivesText, this);
  }

  _updateScoreText(parent, value) {
    this.scoreText.text = `Score: ${value}`;
  }

  _updateLivesText(parent, value) {
    this.livesText.text = `Lives: ${value}`;
  }
}
