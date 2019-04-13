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

    this.registry.set(config.registryKeys.level.arrow.charge, config.entities.level.arrow.minCharge);
    this.registry.set(config.registryKeys.level.scrollingDirection, 0);
    this.registry.set(config.registryKeys.level.state, STATES.PANNING_TO_TARGETS);

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
    this.physics.add.collider(this.arrow.getHitbox(), this.targets.getBullseyeHitboxes(), (arrow, target) => this._onArrowTargetBullseyeCollide(arrow, target));
    this.balloons.addBalloonOverlap(this.arrow.getHitbox(), (arrow, balloon) => this._onArrowBalloonCollide(balloon));
    this.balloons.addStringOverlap(this.arrow.getHitbox(), (arrow, balloon) => this._onArrowBalloonStringCollide(balloon));
    this.physics.add.collider(this.arrow.getHitbox(), this.groundZone, () => this._onArrowGroundCollide());

    this.scene.launch('ui');
  }

  update() {
    this.arrow.update();

    const state = this.registry.get(config.registryKeys.level.state);

    if (state === STATES.REST) {
      this._immediateScroll(this.cameras.main.scrollX + (6 * this.registry.get(config.registryKeys.level.scrollingDirection)))
    } else if (state === STATES.FLY) {
      this._immediateScroll(this.cameras.main.scrollX, false);
    }
  }

  restartLevel() {
    this._immediateScroll(0, true);

    this._resetRegistry();

    this.targets.resetTargetsForLevel(this.levelConfig);
    this.balloons.resetBalloonsForLevel(this.levelConfig);

    this._introPan();
  }

  _loadLevel() {
    this._resetRegistry();

    this.targets.createTargetsForLevel(this.levelConfig);
    this.balloons.createBalloonsForLevel(this.levelConfig);

    this._introPan();
  }

  _resetRegistry() {
    this.registry.set(config.registryKeys.level.gold, 0);

    this.registry.set(config.registryKeys.level.initialArrows, this.levelConfig.arrows);
    this.registry.set(config.registryKeys.level.initialTargets, this.levelConfig.targets.length);
    this.registry.set(config.registryKeys.level.initialBalloons, this.levelConfig.balloons.length);

    this.registry.set(config.registryKeys.level.remainingArrows, this.levelConfig.arrows);
    this.registry.set(config.registryKeys.level.remainingTargets, this.levelConfig.targets.length);
    this.registry.set(config.registryKeys.level.remainingBalloons, this.levelConfig.balloons.length);
    this.registry.set(config.registryKeys.level.poppedBalloons, 0);
  }

  _introPan() {
    this.registry.set(config.registryKeys.level.state, STATES.PANNING_TO_TARGETS);

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
          this.registry.set(config.registryKeys.level.state, STATES.REST);
        }
      });
    } else {
      this.registry.set(config.registryKeys.level.state, STATES.REST);
    }
  }

  _startCharge() {
    if (this.registry.get(config.registryKeys.level.state) === STATES.REST) {
      this.tweens.killTweensOf(this.cameras.main);

      this.registry.set(config.registryKeys.level.scrollingDirection, 0);
      this.registry.set(config.registryKeys.level.state, STATES.CHARGE);
      this._tweenScroll(0, 200);
    }
  }

  _fireArrow() {
    if (this.registry.get(config.registryKeys.level.state) === STATES.CHARGE) {
      this.tweens.killTweensOf(this.cameras.main);

      this.cameras.main.startFollow(this.arrow.getSprite(), true);
      this.registry.set(config.registryKeys.level.state, STATES.FLY);
      this.arrow.fire();
    }
  }

  _onArrowGroundCollide() {
    this.registry.set(config.registryKeys.level.remainingArrows, this.registry.get(config.registryKeys.level.remainingArrows) - 1);
    this.registry.set(config.registryKeys.level.state, STATES.HIT);

    this.arrow.onHit();

    Effects.flashOut([this.arrow.getSprite()], () => {
      this.registry.set(config.registryKeys.level.state, STATES.REST);

      this._checkLevelOver();
      this._reset();
    });
  }

  _onArrowTargetCollide(arrow, targetHitbox, gold = config.entities.level.target.gold) {
    this.registry.set(config.registryKeys.level.remainingArrows, this.registry.get(config.registryKeys.level.remainingArrows) - 1);
    this.registry.set(config.registryKeys.level.remainingTargets, this.registry.get(config.registryKeys.level.remainingTargets) - 1);
    this.registry.set(config.registryKeys.level.state, STATES.HIT);

    this.registry.set(config.registryKeys.level.gold, this.registry.get(config.registryKeys.level.gold) + gold);

    this.arrow.onHit();
    targetHitbox.hitboxParent.onHit();

    Effects.flashOut([this.arrow.getSprite(), targetHitbox.hitboxParent.getSprite()], () => {
      this.registry.set(config.registryKeys.level.state, STATES.REST);

      this._checkLevelOver();
      this._reset();
    });
  }

  _onArrowTargetBullseyeCollide(arrow, targetBullseyeHitbox) {
    const target = targetBullseyeHitbox.hitboxParent;

    this._onArrowTargetCollide(arrow, targetBullseyeHitbox, config.entities.level.targetBullseye.gold);
    Effects.notify(this, target.sprite.x, target.sprite.y, 'Bullseye!');
  }

  _onArrowBalloonCollide(balloon) {
    this.registry.set(config.registryKeys.level.remainingBalloons, this.registry.get(config.registryKeys.level.remainingBalloons) - 1);
    this.registry.set(config.registryKeys.level.poppedBalloons, this.registry.get(config.registryKeys.level.poppedBalloons) + 1);

    this.registry.set(config.registryKeys.level.gold, this.registry.get(config.registryKeys.level.gold) + config.entities.level.balloon.gold);

    balloon.pop()
  }

  _onArrowBalloonStringCollide(balloon) {
    this.registry.set(config.registryKeys.level.remainingBalloons, this.registry.get(config.registryKeys.level.remainingBalloons) - 1);

    balloon.cutString();
  }

  _checkLevelOver() {
    const isLevelOver = this.registry.get(config.registryKeys.level.remainingArrows) === 0 || this.registry.get(config.registryKeys.level.remainingTargets) === 0;

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
    this.rightScrollZone.updatePosition(targetScrollX + config.layouts.level.scrollZones.rightX);
    this.groundZone.updatePosition(targetScrollX);
  }

  _endLevel() {
    this.scene.stop('level');
    this.scene.stop('ui');
    this.scene.start('results');
  }
}
