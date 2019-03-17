import * as STATES from '../game-states';
import { Arrow } from '../entities/arrow.js';
import { Effects } from '../effects';
import { ParallaxBackground } from '../entities/parallax-background.js';
import { Targets } from '../groups/targets.js';
import { GroundZone } from '../entities/ground-zone.js';
import { ScrollZone } from '../entities/scroll-zone';
import { Balloons } from '../groups/balloons';
import { config } from '../config';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'game' })
  }

  create({ level }) {
    this.registry.set('charge', config.entities.game.arrow.minCharge);
    this.registry.set('scrollingDirection', 0);
    this.registry.set('state', STATES.PANNING_TO_TARGETS);

    this.parallaxBackground = new ParallaxBackground(this, 'background-back', 'background-middle', 'background-front');
    this.arrow = new Arrow(this);
    this.targets = new Targets(this);
    this.balloons = new Balloons(this, level);
    this.groundZone = new GroundZone(this);
    this.leftScrollZone = new ScrollZone(this, -1);
    this.rightScrollZone = new ScrollZone(this, 1);

    this.cameras.main.setBounds(0, 0, config.dimensions.world.width, config.dimensions.world.height);

    this.input.setDefaultCursor('crosshair');

    this.input.on('pointerdown', this._startCharge, this);
    this.input.on('pointerup', this._fireArrow, this);

    this._loadLevel(level);

    this.physics.add.collider(this.arrow, this.targets, (arrow, target) => this._onArrowTargetCollide(arrow, target));
    this.balloons.addBalloonOverlap(this.arrow, (arrow, balloon) => this._onArrowBalloonCollide(balloon));
    this.balloons.addStringOverlap(this.arrow, (arrow, balloon) => this._onArrowBalloonStringCollide(balloon));
    this.physics.add.collider(this.arrow, this.groundZone, () => this._onArrowWorldBoundsCollide());

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

  _loadLevel(level) {
    this.registry.set('initialTargets', level.targets.length);
    this.registry.set('initialBalloons', level.balloons.length);

    this.registry.set('arrows', 3);
    this.registry.set('targets', level.targets.length);
    this.registry.set('balloons', level.balloons.length);

    this.targets.createTargetsForLevel(level);
    this.balloons.createBalloonsForLevel(level);

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
    this.tweens.killTweensOf(this.cameras.main);

    this.registry.set('scrollDirection', 0);
    this.registry.set('state', STATES.CHARGE);
    this._tweenScroll(0, 200);
  }

  _fireArrow() {
    this.tweens.killTweensOf(this.cameras.main);

    this.cameras.main.startFollow(this.arrow, true);
    this.registry.set('state', STATES.FLY);
    this.arrow.fire();
  }

  _onArrowWorldBoundsCollide() {
    this.registry.set('arrows', this.registry.get('arrows') - 1);
    this.registry.set('state', STATES.HIT);

    this.arrow.onHit();

    Effects.flashOut([this.arrow], () => {
      this.registry.set('state', STATES.REST);

      this._checkLevelOver();
      this._reset();
    });
  }

  _onArrowTargetCollide(arrow, target) {
    this.registry.set('arrows', this.registry.get('arrows') - 1);
    this.registry.set('targets', this.registry.get('targets') - 1);
    this.registry.set('state', STATES.HIT);

    this.arrow.onHit();
    this.targets.onTargetHit(target);

    Effects.flashOut([arrow, target], () => {
      this.registry.set('state', STATES.REST);

      this._checkLevelOver();
      this._reset();
    });
  }

  _onArrowBalloonCollide(balloon) {
    this.registry.set('balloons', this.registry.get('balloons') - 1);

    balloon.pop()
  }

  _onArrowBalloonStringCollide(balloon) {
    balloon.cutString();
  }

  _checkLevelOver() {
    const isLevelOver = this.registry.get('arrows') === 0
      || (this.registry.get('targets') === 0 && this.registry.get('balloons') === 0);

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
    this.scene.pause('game');
    this.scene.stop('ui');
    this.scene.launch('results');
  }
}
