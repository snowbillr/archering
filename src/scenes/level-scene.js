import * as STATES from '../level-states';
import { Effects } from '../effects';

import { Arrow } from '../entities/arrow.js';
import { ParallaxBackground } from '../entities/parallax-background.js';
import { Targets } from '../groups/targets.js';
import { GroundZone } from '../entities/ground-zone.js';
import { ScrollZone } from '../entities/scroll-zone';
import { Balloons } from '../groups/balloons';

import { config } from '../config';

export class LevelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'level' })
  }

  create({ levelConfig }) {
    this.levelConfig = levelConfig;

    this.registry.set('charge', config.entities.game.arrow.minCharge);
    this.registry.set('scrollingDirection', 0);
    this.registry.set('state', STATES.PANNING_TO_TARGETS);

    this.parallaxBackground = new ParallaxBackground(this, 'background-back', 'background-middle', 'background-front');
    this.arrow = new Arrow(this);
    this.targets = new Targets(this);
    this.balloons = new Balloons(this);
    this.groundZone = new GroundZone(this);
    this.leftScrollZone = new ScrollZone(this, -1);
    this.rightScrollZone = new ScrollZone(this, 1);

    this.cameras.main.setBounds(0, 0, config.dimensions.world.width, config.dimensions.world.height);

    this.input.setDefaultCursor('crosshair');

    this.input.on('pointerdown', this._startCharge, this);
    this.input.on('pointerup', this._fireArrow, this);

    this._loadLevel();

    this.physics.add.collider(this.arrow.getHitbox(), this.targets.getHitboxes(), (arrow, target) => this._onArrowTargetCollide(arrow, target));
    this.balloons.addBalloonOverlap(this.arrow.getHitbox(), (arrow, balloon) => this._onArrowBalloonCollide(balloon));
    this.balloons.addStringOverlap(this.arrow.getHitbox(), (arrow, balloon) => this._onArrowBalloonStringCollide(balloon));
    this.physics.add.collider(this.arrow.getHitbox(), this.groundZone, () => this._onArrowGroundCollide());

    this.scene.launch('ui');
  }

  update() {
    this.arrow.update();

    const state = this.registry.get('state');

    if (state === STATES.REST) {
      this._immediateScroll(this.cameras.main.scrollX + (6 * this.registry.get('scrollingDirection')))
    } else if (state === STATES.FLY) {
      this._immediateScroll(this.cameras.main.scrollX, false);
    }
  }

  restartLevel() {
    this._immediateScroll(0, true);

    this.registry.set('initialTargets', this.levelConfig.targets.length);
    this.registry.set('initialBalloons', this.levelConfig.balloons.length);

    this.registry.set('arrows', 3);
    this.registry.set('remainingTargets', this.levelConfig.targets.length);
    this.registry.set('remainingBalloons', this.levelConfig.balloons.length);
    this.registry.set('poppedBalloons', 0);

    this.targets.resetTargetsForLevel(this.levelConfig);
    this.balloons.resetBalloonsForLevel(this.levelConfig);

    this._introPan();
  }

  _loadLevel() {
    this.registry.set('initialTargets', this.levelConfig.targets.length);
    this.registry.set('initialBalloons', this.levelConfig.balloons.length);

    this.registry.set('arrows', 3);
    this.registry.set('remainingTargets', this.levelConfig.targets.length);
    this.registry.set('remainingBalloons', this.levelConfig.balloons.length);
    this.registry.set('poppedBalloons', 0);

    this.targets.createTargetsForLevel(this.levelConfig);
    this.balloons.createBalloonsForLevel(this.levelConfig);

    this._introPan();
  }

  _introPan() {
    this.registry.set('state', STATES.PANNING_TO_TARGETS);

    const furthestTargetX = this.targets.getFurthestTargetX();
    const furthestBalloonX = this.balloons.getFurthestBalloonX();
    const furthestX = Math.max(furthestTargetX, furthestBalloonX);

    if (furthestX > 600) {
      this._tweenScroll(furthestX - 500, 800, {
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
    if (this.registry.get('state') === STATES.REST) {
      this.tweens.killTweensOf(this.cameras.main);

      this.registry.set('scrollDirection', 0);
      this.registry.set('state', STATES.CHARGE);
      this._tweenScroll(0, 200);
    }
  }

  _fireArrow() {
    if (this.registry.get('state') === STATES.CHARGE) {
      this.tweens.killTweensOf(this.cameras.main);

      this.cameras.main.startFollow(this.arrow.getSprite(), true);
      this.registry.set('state', STATES.FLY);
      this.arrow.fire();
    }
  }

  _onArrowGroundCollide() {
    this.registry.set('arrows', this.registry.get('arrows') - 1);
    this.registry.set('state', STATES.HIT);

    this.arrow.onHit();

    Effects.flashOut([this.arrow.getSprite()], () => {
      this.registry.set('state', STATES.REST);

      this._checkLevelOver();
      this._reset();
    });
  }

  _onArrowTargetCollide(arrow, target) {
    this.registry.set('arrows', this.registry.get('arrows') - 1);
    this.registry.set('remainingTargets', this.registry.get('remainingTargets') - 1);
    this.registry.set('state', STATES.HIT);

    this.arrow.onHit();
    target.hitboxParent.onHit();

    Effects.flashOut([this.arrow.getSprite(), target.hitboxParent.getSprite()], () => {
      this.registry.set('state', STATES.REST);

      this._checkLevelOver();
      this._reset();
    });
  }

  _onArrowBalloonCollide(balloon) {
    this.registry.set('remainingBalloons', this.registry.get('remainingBalloons') - 1);
    this.registry.set('poppedBalloons', this.registry.get('poppedBalloons') + 1);

    balloon.pop()
  }

  _onArrowBalloonStringCollide(balloon) {
    this.registry.set('remainingBalloons', this.registry.get('remainingBalloons') - 1);

    balloon.cutString();
  }

  _checkLevelOver() {
    const isLevelOver = this.registry.get('arrows') === 0
      || (this.registry.get('remainingTargets') === 0 && this.registry.get('remainingBalloons') === 0);

    if (isLevelOver) {
      this._endLevel();
    }
  }

  _reset() {
    this.cameras.main.stopFollow();
    this._tweenScroll(0, 300);
    this.arrow.reset();
  }

  _tweenScroll(targetScrollX, duration, additionalTweenProps = {}) {
    const defaultTweenProps = {
      targets: this.cameras.main,
      props: {
        scrollX: targetScrollX,
      },
      duration: duration,
      ease: Phaser.Math.Easing.Quadratic.Out,
      onUpdate: () => {
        this._immediateScroll(this.cameras.main.scrollX, false);
      },
    };
    const tweenProps = Object.assign(defaultTweenProps, additionalTweenProps);

    this.tweens.add(tweenProps);
  }

  _immediateScroll(targetScrollX, includeCamera = true) {
    if (includeCamera) this.cameras.main.scrollX = targetScrollX;
    this.parallaxBackground.update(targetScrollX);
    this.leftScrollZone.updatePosition(targetScrollX);
    this.rightScrollZone.updatePosition(targetScrollX + config.layouts.game.scrollZones.rightX);
    this.groundZone.updatePosition(targetScrollX);
  }

  _endLevel() {
    this.scene.pause('level');
    this.scene.stop('ui');
    this.scene.launch('results');
  }
}
