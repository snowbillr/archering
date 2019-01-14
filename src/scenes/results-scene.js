export class ResultsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'results' });
  }

  create({ didWin }) {
    const text = didWin ? 'Level Completed!' : 'Level Failed';
    this.add.text(320, 50, text).setOrigin(0.5, 0);

    this.add.text(320, 100, 'Back to Level Selet', {
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
