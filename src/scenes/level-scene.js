import * as STATES from '../level-states';
import { Effects } from '../effects';

import { Arrow } from '../entities/arrow.js';
import { ParallaxBackground } from '../entities/parallax-background.js';
import { Targets } from '../groups/targets.js';
import { GroundZone } from '../entities/ground-zone.js';
import { ScrollZone } from '../entities/scroll-zone';
import { Balloons } from '../groups/balloons';

import { config } from '../config';
import { ArrowBalloonCollider } from '../colliders/arrow-balloon-collider';
import { ArrowTargetCollider } from '../colliders/arrow-target-collider';
import { ArrowGroundCollider } from '../colliders/arrow-ground-collider';
import { SkillManager } from '../skills/skill-manager';

export class LevelScene extends Phaser.Scene {
  constructor() {
    super({ key: 'level' })
  }

  create({ levelConfig }) {
    this.levelConfig = levelConfig;
    this.skillManager = new SkillManager(this);

    // camera
    this.cameras.main.setBounds(0, 0, config.dimensions.world.width, config.dimensions.world.height);

    // input
    this.input.setDefaultCursor('crosshair');
    this.input.on('pointerdown', this._startCharge, this);
    this.input.on('pointerup', this._fireArrow, this);

    // entities
    this.parallaxBackground = new ParallaxBackground(this, 'background-back', 'background-middle', 'background-front');
    this.groundZone = new GroundZone(this);
    this.leftScrollZone = new ScrollZone(this, -1);
    this.rightScrollZone = new ScrollZone(this, 1);
    this.arrow = new Arrow(this);
    this.targets = new Targets(this);
    this.balloons = new Balloons(this);

    // load level (must come after entities because it uses targets and balloons)
    this._loadLevel();

    // physics
    const arrowBalloonCollider = new ArrowBalloonCollider(this);
    const arrowTargetCollider = new ArrowTargetCollider(this, this.arrowColliderCallback);
    const arrowGroundCollider = new ArrowGroundCollider(this, this.arrowColliderCallback);

    this.physics.add.overlap(this.arrow.getHitbox(), this.targets.getHitboxes(), arrowTargetCollider.onTargetHit);
    this.physics.add.overlap(this.arrow.getHitbox(), this.targets.getBullseyeHitboxes(), arrowTargetCollider.onBullseyeHit);
    this.physics.add.overlap(this.arrow.getHitbox(), this.balloons.getBalloonHitboxes(), arrowBalloonCollider.onBalloonHit)
    this.physics.add.overlap(this.arrow.getHitbox(), this.balloons.getStringHitboxes(), arrowBalloonCollider.onStringHit)
    this.physics.add.collider(this.arrow.getHitbox(), this.groundZone, arrowGroundCollider.onHit);

    // launch ui
    this.scene.launch('ui');
  }

  update() {
    this.arrow.update();

    const state = this.registry.get(config.registryKeys.level.state);

    if (state === STATES.REST) {
      let scrollAmount = 6 * this.registry.get(config.registryKeys.level.scrollingDirection);
      if (this.cameras.main.scrollX == 0 && scrollAmount < 0) {
        scrollAmount = 0;
      }
      this._immediateScroll(this.cameras.main.scrollX + scrollAmount)
    } else if (state === STATES.FLY) {
      this._immediateScroll(this.cameras.main.scrollX, false);
    }
  }

  restartLevel() {
    this._immediateScroll(0, true);

    this.skillManager.deactivateAll();
    this._resetRegistry();

    this.targets.resetTargetsForLevel(this.levelConfig);
    this.balloons.resetBalloonsForLevel(this.levelConfig);

    this._introPan();
  }

  arrowColliderCallback() {
    this._checkLevelOver();
    this._reset();
  }

  _loadLevel() {
    this._resetRegistry();

    this.targets.createTargetsForLevel(this.levelConfig);
    this.balloons.createBalloonsForLevel(this.levelConfig);

    this._introPan();
  }

  _resetRegistry() {
    this.registry.set(config.registryKeys.level.arrow.charge, config.entities.level.arrow.minCharge);
    this.registry.set(config.registryKeys.level.scrollingDirection, 0);

    this.registry.set(config.registryKeys.level.gold, 0);

    this.registry.set(config.registryKeys.level.initialArrows, this.levelConfig.arrows);
    this.registry.set(config.registryKeys.level.initialTargets, this.levelConfig.targets.length);
    this.registry.set(config.registryKeys.level.initialBalloons, this.levelConfig.balloons.length);

    this.registry.set(config.registryKeys.level.remainingArrows, this.levelConfig.arrows);
    this.registry.set(config.registryKeys.level.remainingTargets, this.levelConfig.targets.length);
    this.registry.set(config.registryKeys.level.remainingBalloons, this.levelConfig.balloons.length);
    this.registry.set(config.registryKeys.level.poppedBalloons, 0);

    this.registry.set(config.registryKeys.level.state, STATES.PANNING_TO_TARGETS);
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

  _checkLevelOver() {
    const isLevelOver = this.registry.get(config.registryKeys.level.remainingArrows) === 0 || this.registry.get(config.registryKeys.level.remainingTargets) === 0;

    if (isLevelOver) {
      this._endLevel();
    }
  }

  _endLevel() {
    this.skillManager.deactivateAll();

    this.scene.stop('level');
    this.scene.stop('ui');
    this.scene.start('results');
  }

  _reset() {
    this.skillManager.deactivateAll();
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
}
