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
    this._displayScores(scores);

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

  _displayScores(scores) {
    let y = 100;
    const yStep = 30;

    const scoreTypeOrder = ['target', 'balloon', 'arrow', 'total'];
    const scoreTypeLabels = {
      'target': 'Targets:',
      'balloon': 'Balloons:',
      'arrow': 'Arrows:',
      'total': 'Total:',
    };
    for (let scoreType of scoreTypeOrder) {
      this.add.bitmapText(250, y, 'font', scoreTypeLabels[scoreType], 24);
      this.add.bitmapText(350, y, 'font', scores[scoreType], 24);

      y += yStep;
    }
  }
}
