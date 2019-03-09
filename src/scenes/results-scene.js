import { Storage } from '../lib/storage';

const SCORE_MULTIPLIERS = {
  targets: 150,
  balloons: 200,
  arrows: 100,
};

export class ResultsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'results' });
  }

  create() {
    const didWin = this.registry.get('targets') === 0

    const resultText = didWin ? 'Level Passed!' : 'Level Failed!';
    this.add.bitmapText(320, 40, 'font', resultText, 32).setOrigin(0.5, 0);

    const scores = this._calculateScore();

    this._saveScore(scores);

    this._displayScores(scores, () => {
      this.add.text(320, 260, 'Back to Level Select', {
        fill: '#000',
        backgroundColor: '#6c6',
        padding: 6,
      }).setOrigin(0.5, 0)
        .setInteractive({ cursor: 'pointer' })
        .once('pointerup', () => {
          this.scene.stop('game');
          this.scene.stop('results');
          this.scene.start('level-select');
      });
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

    const totalScore = arrowScore + targetScore + balloonScore;
    const maxPossibleScore = (initialTargets * SCORE_MULTIPLIERS.targets) + (initialBalloons * SCORE_MULTIPLIERS.balloons);
    const percentageScore = totalScore / maxPossibleScore;

    return {
      arrow: arrowScore,
      target: initialTargets > 0 ? targetScore : null,
      balloon: initialBalloons > 0 ? balloonScore : null,
      total: totalScore,
      stars: Phaser.Math.CeilTo(Phaser.Math.FromPercent(percentageScore, 1, 4)),
    };
  }

  _saveScore(scores) {
    const storage = new Storage();

    const levelIndex = this.registry.get('levelIndex');
    const existingStars = storage.loadLevelStars(levelIndex);

    if (scores.stars > existingStars) {
      storage.saveLevelStars(levelIndex, scores.stars);
    }
  }

  _displayScores(scores, onComplete) {
    let y = 80;
    const yStep = 30;

    const scoreTypeOrder = ['target', 'balloon', 'arrow', 'total'];
    const scoreTypeLabels = {
      'target': 'Targets:',
      'balloon': 'Balloons:',
      'arrow': 'Arrows:',
      'total': 'Total:',
    };

    const tweens = [];
    scoreTypeOrder.forEach(scoreType => {
      if (scores[scoreType] == null) { return; }

      this.add.bitmapText(250, y, 'font', scoreTypeLabels[scoreType], 24);
      const valueText = this.add.bitmapText(350, y, 'font', 0, 24);
      y += yStep;

      tweens.push({
        targets: [{ value: 0 }],
        props: { value: scores[scoreType] },
        duration: 600,
        onUpdate: tween => {
          valueText.setText(Phaser.Math.RoundTo(tween.getValue()));
        }
      });
    });

    const starY = y + 18;
    for (let i = 0; i < 3; i++) {
      const grayStar = this.add.image(275 + i * 40, starY, 'star-gray');
      grayStar.setDisplaySize(36, 36);
      grayStar.setOrigin(0.5);
    }
    for (let i = 0; i < scores.stars; i++) {
      const star = this.add.image(275 + i * 40, starY, 'star');
      star.alpha = 0;
      star.setDisplaySize(48, 48);
      star.setOrigin(0.5);

      tweens.push({
        targets: [star],
        props: {
          alpha: 1,
          displayWidth: 36,
          displayHeight: 36,
        },
        duration: 100,
        delay: 200,
      });
    }

    this.tweens.timeline({ tweens, onComplete });
  }
}
