import levels from '../levels.json';
import * as STATES from '../game-states';
import { Arrow } from '../entities/arrow.js';
import { Effects } from '../effects';

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

    this.physics.world.setBounds(0, 0, 640, 300);

    this.backgroundBack = this.add.tileSprite(0, 0, 640, 300, 'background-back');
    this.backgroundBack.setOrigin(0, 0);
    this.backgroundBack.setTileScale(1, 1.35);

    this.backgroundMiddle = this.add.tileSprite(0, 0, 640, 300, 'background-middle');
    this.backgroundMiddle.setOrigin(0, 0);
    this.backgroundMiddle.setTileScale(1, 1.35);

    this.backgroundFront = this.add.tileSprite(0, 0, 640, 300, 'background-front');
    this.backgroundFront.setOrigin(0, 0);
    this.backgroundFront.setTileScale(1, 1.35);

    this.arrow = new Arrow(this);
    this.arrow.reset();

    this.targets = this.physics.add.group({
      defaultKey: 'target',
      allowGravity: false,
      immovable: true,
      classType: Phaser.Physics.Arcade.Image,
    });

    this._loadLevel();

    this.physics.world.on('worldbounds', this._onArrowWorldBoundsCollide, this);
    this.physics.add.collider(this.arrow, this.targets, (arrow, target) => this._onArrowTargetCollide(arrow, target));

    this.input.on('pointerdown', this._startCharge, this);
    this.input.on('pointerup', this._fireArrow, this);

    this.registry.set('state', STATES.REST);
  }

  update() {
    this.arrow.update();

    if (this.registry.get('state') === STATES.CHARGE) {
      const chargeAmount = this.registry.get('charge');
      const newCharge = Phaser.Math.Clamp(chargeAmount + 5, 200, 700);
      this.registry.set('charge', newCharge);
    }

    const xScrollAmount = this.arrow.x - 50 - 400;
    if (xScrollAmount > 0) {
      this.cameras.main.scrollX = xScrollAmount;

      this.backgroundBack.x = xScrollAmount;
      this.backgroundBack.tilePositionX = xScrollAmount;

      this.backgroundMiddle.x = xScrollAmount;
      this.backgroundMiddle.tilePositionX = xScrollAmount;

      this.backgroundFront.x = xScrollAmount;
      this.backgroundFront.tilePositionX = xScrollAmount;
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
    this.tweens.add({
      targets: [this.backgroundBack, this.backgroundMiddle, this.backgroundFront],
      props: {
        x: 0,
        tilePositionX: 0,
      },
      duration: 300,
      ease: Phaser.Math.Easing.Quadratic.Out,
    })
  }
}
