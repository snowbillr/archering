export class ResultsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'results' });
  }

  create() {
    this.add.text(320, 50, 'Results').setOrigin(0.5, 0);
    this.add.text(320, 100, `Score: ${this.registry.get('score')}`).setOrigin(0.5, 0);

    this.add.text(320, 150, 'Play Again', {
      fill: '#000',
      backgroundColor: '#6c6',
      padding: 6,
    }).setOrigin(0.5, 0)
      .setInteractive({ cursor: 'pointer' })
      .once('pointerup', () => this.scene.start('game'));
  }
}
