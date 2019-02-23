import { Storage } from '../lib/storage';

const SCORE_MULTIPLIERS = {
  targets: 100,
  balloons: 150,
  arrows: 200,
};

export class ResultsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'results' });
  }

  create() {
    const storage = new Storage();
    const didWin = this.registry.get('targets') === 0

    const resultText = didWin ? 'Level Passed!' : 'Level Failed!';
    this.add.bitmapText(320, 50, 'font', resultText, 24).setOrigin(0.5, 0);

    const scores = this._calculateScore();
    storage.saveLevelScore(this.registry.get('levelIndex'), scores.total);

    const targetScoreLabel = this.add.bitmapText(250, 100, 'font', 'Targets:', 24);
    const targetScoreValue = this.add.bitmapText(250 + targetScoreLabel.width + 20, 100, 'font', scores.target, 24);

    const balloonScoreLabel = this.add.bitmapText(250, 130, 'font', 'Balloons:', 24);
    const balloonScoreValue = this.add.bitmapText(250 + balloonScoreLabel.width + 20, 130, 'font', scores.balloon, 24);

    const arrowScoreLabel = this.add.bitmapText(250, 160, 'font', 'Arrows:', 24);
    const arrowScoreValue = this.add.bitmapText(250 + arrowScoreLabel.width + 20, 160, 'font', scores.arrow, 24);

    const totalScoreLabel = this.add.bitmapText(250, 190, 'font', 'Total:', 24);
    const totalScoreValue = this.add.bitmapText(250 + totalScoreLabel.width + 20, 190, 'font', scores.total, 26);

    this.add.text(320, 230, 'Back to Level Select', {
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

  _calculateScore() {
    const remainingArrows = this.registry.get('arrows');
    const arrowScore = remainingArrows * SCORE_MULTIPLIERS.arrows;

    const initialTargets = this.registry.get('initialTargets');
    const remainingTargets = this.registry.get('targets');
    const targetScore = (initialTargets - remainingTargets) * SCORE_MULTIPLIERS.targets;

    const initialBalloons = this.registry.get('initialBalloons');
    const remainingBalloons = this.registry.get('balloons');
    const balloonScore = (initialBalloons - remainingBalloons) * SCORE_MULTIPLIERS.balloons;

    return {
      arrow: arrowScore,
      target: targetScore,
      balloon: balloonScore,
      total: arrowScore + targetScore + balloonScore,
    };
  }
}
