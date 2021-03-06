import { Storage } from '../lib/storage';
import { config } from '../config';

const resultsConfig = config.layouts.results;
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
    this.storage = new Storage();

    const newGoldAmount = this.registry.get(config.registryKeys.gold) + this.registry.get(config.registryKeys.level.gold);

    this.registry.set(config.registryKeys.gold, newGoldAmount);

    this.storage.saveGold(newGoldAmount);
    this.storage.saveSkill('spectralArrow', this.registry.get(config.registryKeys.skills.spectralArrow));
    this.storage.saveSkill('splitArrow', this.registry.get(config.registryKeys.skills.splitArrow));
    this.storage.saveSkill('cannonball', this.registry.get(config.registryKeys.skills.cannonball));

    this.add.image(resultsConfig.background.x, resultsConfig.background.y, 'background-parchment')
      .setDisplaySize(resultsConfig.background.width, resultsConfig.background.height)

    const didWin = this.registry.get(config.registryKeys.level.remainingTargets) === 0

    const titleText = didWin ? 'Level Passed!' : 'Level Failed!';
    this.add.bitmapText(resultsConfig.title.x, resultsConfig.title.y, 'font', titleText, resultsConfig.title.size)
      .setOrigin(0.5, 0);

    if (didWin) {
      const scores = this._calculateScore();

      this._saveScore(scores);

      this._displayScores(scores, () => {
        this._showReturnToLevelSelectButton();
      });
    } else {
      this._showReturnToLevelSelectButton();
    }
  }

  _showReturnToLevelSelectButton() {
    this.add.text(resultsConfig.levelSelectButton.x, resultsConfig.levelSelectButton.y, 'Back to Level Select', {
      fill: '#000',
      backgroundColor: '#6c6',
      padding: 6,
    }).setOrigin(0.5, 0)
      .setInteractive({ cursor: 'pointer' })
      .once('pointerup', () => {
        this.scene.stop('results');
        this.scene.start('level-select');
    });
  }

  _calculateScore() {
    const initialArrows = this.registry.get(config.registryKeys.level.initialArrows);
    const remainingArrows = this.registry.get(config.registryKeys.level.remainingArrows);
    const arrowScore = remainingArrows * SCORE_MULTIPLIERS.arrows;

    const initialTargets = this.registry.get(config.registryKeys.level.initialTargets);
    const remainingTargets = this.registry.get(config.registryKeys.level.remainingTargets);
    const targetScore = (initialTargets - remainingTargets) * SCORE_MULTIPLIERS.targets;

    const initialBalloons = this.registry.get(config.registryKeys.level.initialBalloons);
    const poppedBalloons = this.registry.get(config.registryKeys.level.poppedBalloons);
    const balloonScore = poppedBalloons * SCORE_MULTIPLIERS.balloons;

    const totalScore = arrowScore + targetScore + balloonScore;
    const maxPossibleScore = (initialTargets * SCORE_MULTIPLIERS.targets) + (initialBalloons * SCORE_MULTIPLIERS.balloons) + ((initialArrows - initialTargets) * SCORE_MULTIPLIERS.arrows);
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
    const levelIndex = this.registry.get(config.registryKeys.level.index);
    const existingStars = this.storage.loadLevelStars(levelIndex);

    if (scores.stars > existingStars) {
      this.storage.saveLevelStars(levelIndex, scores.stars);
    }
  }

  _displayScores(scores, onComplete) {
    let y = resultsConfig.scores.y;
    const yStep = resultsConfig.scores.yStep;

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

      this.add.bitmapText(resultsConfig.scores.labelX, y, 'font', scoreTypeLabels[scoreType], resultsConfig.scores.size);
      const valueText = this.add.bitmapText(resultsConfig.scores.valueX, y, 'font', 0, resultsConfig.scores.size);
      y += yStep;

      tweens.push({
        targets: [{ value: 0 }],
        props: { value: scores[scoreType] },
        duration: scores[scoreType] > 0 ? 600 : 1,
        onUpdate: tween => {
          valueText.setText(Phaser.Math.RoundTo(tween.getValue()));
        }
      });
    });

    const starY = y + resultsConfig.stars.yTopMargin;
    for (let i = 0; i < 3; i++) {
      const starX = resultsConfig.stars.x + (i * resultsConfig.stars.xStep);
      const grayStar = this.add.image(starX, starY, 'star-gray');
      grayStar.setDisplaySize(resultsConfig.stars.width, resultsConfig.stars.height);
      grayStar.setOrigin(0.5);
    }
    for (let i = 0; i < scores.stars; i++) {
      const starX = resultsConfig.stars.x + (i * resultsConfig.stars.xStep);
      const star = this.add.image(starX, starY, 'star');
      star.alpha = 0;
      star.setDisplaySize(resultsConfig.stars.width * 2, resultsConfig.stars.height * 2);
      star.setOrigin(0.5);

      tweens.push({
        targets: [star],
        props: {
          alpha: 1,
          displayWidth: resultsConfig.stars.width,
          displayHeight: resultsConfig.stars.height,
        },
        duration: 150,
        delay: 200,
      });
    }

    this.tweens.timeline({ tweens, onComplete });
  }
}
