import * as STATES from '../game-states';
import { Arrow } from '../entities/arrow.js';
import { Effects } from '../effects';
import { ParallaxBackground } from '../entities/parallax-background.js';
import { Targets } from '../groups/targets.js';
import { GroundZone } from '../entities/ground-zone.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'game' })
  }

  preload() {
    this.load.image('target', 'assets/target.png');
    this.load.image('arrow', 'assets/arrow.png');

    this.load.image('background-back', 'assets/background-back.png');
    this.load.image('background-middle', 'assets/background-middle.png');
    this.load.image('background-front', 'assets/background-front.png');
  }

  create({ level }) {
    this.registry.set('lives', 3);
    this.registry.set('charge', 200);
    this.scene.launch('ui');

    this.parallaxBackground = new ParallaxBackground(this, 'background-back', 'background-middle', 'background-front');

    this.arrow = new Arrow(this);
    this.targets = new Targets(this);
    this.groundZone = new GroundZone(this);

    this.scrollingLeft = false;
    this.leftScrollZone = this.add.zone(0, 0).setSize(100, 300).setInteractive({ cursor: 'w-resize' });
    this.leftScrollZone.on('pointerover', () => this.scrollingLeft = true);
    this.leftScrollZone.on('pointerout', () => this.scrollingLeft = false);

    this.scrollingRight = false;
    this.rightScrollZone = this.add.zone(540, 0).setSize(100, 300).setInteractive({ cursor: 'e-resize' });
    this.rightScrollZone.on('pointerover', () => this.scrollingRight = true);
    this.rightScrollZone.on('pointerout', () => this.scrollingRight = false);

    this.registry.set('state', STATES.PANNING_TO_TARGETS);

    this.cameras.main.setBounds(0, 0, 1500, 300);

    this.input.setDefaultCursor('crosshair');

    this.input.on('pointerdown', this._startCharge, this);
    this.input.on('pointerup', this._fireArrow, this);

    this.physics.add.collider(this.arrow, this.targets, (arrow, target) => this._onArrowTargetCollide(arrow, target));
    this.physics.add.collider(this.arrow, this.groundZone, () => this._onArrowWorldBoundsCollide());

    this._loadLevel(level);
  }

  update() {
    this.arrow.update();

    const state = this.registry.get('state');

    if (state === STATES.REST) {
      if (this.scrollingLeft) {
        this.cameras.main.scrollX -= 6;
      } else if (this.scrollingRight) {
        this.cameras.main.scrollX += 6;
      }

      this.parallaxBackground.update(this.cameras.main.scrollX);

      this.leftScrollZone.x = this.cameras.main.scrollX;
      this.rightScrollZone.x = this.cameras.main.scrollX + 540;
    }
    else if (state === STATES.FLY) {
      this.groundZone.updatePosition(this.cameras.main.scrollX);
      this.parallaxBackground.update(this.cameras.main.scrollX);
    }
  }

  _loadLevel(level) {
    this.targets.createTargetsForLevel(level);

    const furthestTargetX = this.targets.getFurthestTargetX();

    if (furthestTargetX > 600) {
      this._scroll(furthestTargetX - 500, 800, {
        yoyo: true,
        delay: 400,
        hold: 500,
        ease: Phaser.Math.Easing.Quadratic.InOut,
        onComplete: () => {
          this.registry.set('state', STATES.REST);
        }
      });
    } else {
      this.registry.set('state', STATES.REST);
    }
  }

  _startCharge() {
    this.registry.set('state', STATES.CHARGE);
    this._scroll(0, 200);
  }

  _fireArrow() {
    this.cameras.main.startFollow(this.arrow);
    this.registry.set('state', STATES.FLY);
    this.arrow.fire();
  }

  _onArrowWorldBoundsCollide() {
    this.registry.set('state', STATES.HIT);
    this.arrow.onHit();

    const nextLives = this.registry.get('lives') - 1
    if (nextLives === 0) {
      this._endGame();
    }

    this.registry.set('lives', nextLives);

    Effects.flashOut([this.arrow], () => {
      this.registry.set('state', STATES.REST);

      this._reset();
    });
  }

  _onArrowTargetCollide(arrow, target) {
    this.registry.set('state', STATES.HIT);
    this.arrow.onHit();
    this.targets.onTargetHit(target);

    Effects.flashOut([arrow, target], () => {
      this.registry.set('state', STATES.REST);

      this._reset();

      if (this.targets.countActive() === 0) {
        console.log('level over!')
      }
    });
  }

  _endGame() {
    this.scene.stop('game');
    this.scene.stop('ui');
    this.scene.start('results');
  }

  _reset() {
    this.cameras.main.stopFollow();
    this.groundZone.updatePosition(0);
    this._scroll(0, 300);
    this.arrow.reset();
  }

  _scroll(targetScrollX, duration, additionalTweenProps = {}) {
    const defaultTweenProps = {
      targets: this.cameras.main,
      props: {
        scrollX: targetScrollX,
      },
      duration: duration,
      ease: Phaser.Math.Easing.Quadratic.Out,
      onUpdate: () => {
        this.parallaxBackground.update(this.cameras.main.scrollX);
      },
    };
    const tweenProps = Object.assign(defaultTweenProps, additionalTweenProps);

    this.tweens.add(tweenProps);
  }
}
