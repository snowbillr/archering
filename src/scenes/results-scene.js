export class ResultsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'results' });
  }

  create() {
    const didWin = this.registry.get('targets') === 0 && this.registry.get('balloons') === 0;

    const text = didWin ? 'Level Completed!' : 'Level Failed';
    this.add.bitmapText(320, 50, 'font', text, 24).setOrigin(0.5, 0);

    this.add.text(320, 100, 'Back to Level Select', {
      fill: '#000',
      backgroundColor: '#6c6',
      padding: 6,
    }).setOrigin(0.5, 0)
      .setInteractive({ cursor: 'pointer' })
      .once('pointerup', () => {
        this.scene.stop('game');
        this.scene.stop('ui');
        this.scene.stop('results');
        this.scene.start('level-select');
      });
  }
}
