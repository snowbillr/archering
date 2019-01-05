import levels from '../levels.json';
import * as STATES from '../game-states';
import { Arrow } from '../entities/arrow.js';
import { Effects } from '../effects';
import { ParallaxBackground } from '../components/parallax-background.js';

export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'game' })

    this.levelIndex = 0;
  }

  preload() {
    this.load.image('target', 'assets/target.png');
    this.load.image('arrow', 'assets/arrow.png');

    this.load.image('background-back', 'assets/background-back.png');
    this.load.image('background-middle', 'assets/background-middle.png');
    this.load.image('background-front', 'assets/background-front.png');
  }

  create() {
    this.registry.set('score', 0);
    this.registry.set('lives', 3);
    this.registry.set('charge', 200);
    this.scene.launch('ui');

    this.input.setDefaultCursor('crosshair');

    this.parallaxBackground = new ParallaxBackground(this, 'background-back', 'background-middle', 'background-front');

    this.arrow = new Arrow(this);
    this.arrow.reset();

    this.targets = this.physics.add.group({
      defaultKey: 'target',
      allowGravity: false,
      immovable: true,
      classType: Phaser.Physics.Arcade.Image,
    });

    this.groundZone = this.add.zone(0, 260).setSize(640, 40).setScrollFactor(0);
    this.physics.world.enable(this.groundZone);
    this.groundZone.body.allowGravity = false;
    this.groundZone.body.immovable = true;

    this.registry.set('state', STATES.REST);

    this.input.on('pointerdown', this._startCharge, this);
    this.input.on('pointerup', this._fireArrow, this);

    this.physics.add.collider(this.arrow, this.targets, (arrow, target) => this._onArrowTargetCollide(arrow, target));
    this.physics.add.collider(this.arrow, this.groundZone, () => this._onArrowWorldBoundsCollide());

    this._loadLevel();
  }

  update() {
    this.arrow.update();

    const state = this.registry.get('state');

    if (state === STATES.CHARGE) {
      const chargeAmount = this.registry.get('charge');
      const newCharge = Phaser.Math.Clamp(chargeAmount + 5, 200, 700);
      this.registry.set('charge', newCharge);
    } else if (state === STATES.FLY) {
      this.groundZone.x = this.cameras.main.scrollX;

      const xScrollAmount = this.arrow.x - 50 - 400;
      if (xScrollAmount > 0) {
        this.cameras.main.scrollX = xScrollAmount;

        this.parallaxBackground.update(xScrollAmount);
      }
    }
  }

  _loadNextLevel() {
    this.levelIndex += 1;
    this._loadLevel();
  }

  _loadLevel() {
    const level = levels[this.levelIndex];

    level.targets.forEach(coordinates => {
      const target = this.targets.get();
      this.physics.world.enableBody(target);
      target.alpha = 1;
      target.active = true;

      target.x = coordinates.x;
      target.y = coordinates.y;
    });

    const furthestTargetCoordinates = level.targets.reduce((furthest, coordinates) => {
      if (coordinates.x > furthest.x) {
        return coordinates;
      } else {
        return furthest;
      }
    }, { x: 0, y: 0 });

    this.tweens.add({
      targets: this.cameras.main,
      props: {
        scrollX: furthestTargetCoordinates.x - 500,
      },
      duration: 800,
      yoyo: true,
      delay: 400,
      hold: 500,
      ease: Phaser.Math.Easing.Quadratic.InOut,
      onUpdate: () => {
        this.parallaxBackground.update(this.cameras.main.scrollX);
      }
    });
  }

  _startCharge() {
    this.registry.set('state', STATES.CHARGE);
  }

  _fireArrow() {
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

    this.registry.set('score', this.registry.get('score') + 10);

    Effects.flashOut([arrow, target], () => {
      this.registry.set('state', STATES.REST);

      this._reset();

      this.physics.world.disableBody(target.body);
      target.active = false;

      if (this.targets.countActive() === 0) {
        this._loadNextLevel();
      }
    });
  }

  _endGame() {
    this.scene.stop('game');
    this.scene.stop('ui');
    this.scene.start('results');
  }

  _reset() {
    this.groundZone.x = 0;
    this._resetCamera();
    this.arrow.reset();
    this.registry.set('charge', 200);
  }

  _resetCamera() {
    this.tweens.add({
      targets: this.cameras.main,
      props: {
        scrollX: 0,
      },
      duration: 300,
      ease: Phaser.Math.Easing.Quadratic.Out,
    });

    this.parallaxBackground.reset();
  }
}
