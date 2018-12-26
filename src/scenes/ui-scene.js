export class UiScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ui' });
  }

  create() {
    this.scoreText = this.add.text(50, 50, '');
    this._updateScoreText(null, 0);

    this.registry.events.on('changedata_score', this._updateScoreText, this);
  }

  _updateScoreText(parent, value) {
    this.scoreText.text = `Score: ${value}`;
  }
}
