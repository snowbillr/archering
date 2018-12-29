import levels from '../levels.json';

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
    this.scene.launch('ui');

    this.input.setDefaultCursor('crosshair');

    this.physics.world.setBounds(0, 0, 640, 300);

    this.backgroundBack = this.add.tileSprite(0, 0, 1000, 300, 'background-back');
    this.backgroundBack.setOrigin(0, 0);
    this.backgroundBack.setTileScale(1, 1.35);

    this.backgroundMiddle = this.add.tileSprite(0, 0, 1000, 300, 'background-middle');
    this.backgroundMiddle.setOrigin(0, 0);
    this.backgroundMiddle.setTileScale(1, 1.35);

    this.backgroundFront = this.add.tileSprite(0, 0, 1000, 300, 'background-front');
    this.backgroundFront.setOrigin(0, 0);
    this.backgroundFront.setTileScale(1, 1.35);

    this.arrow = this.physics.add.image(0, 0, 'arrow');
    this.arrow.setScale(0.75);
    this.arrow.body.collideWorldBounds = true;
    this.arrow.body.onWorldBounds = true;
    this.arrow.body.allowGravity = false;
    this._resetArrow();

    this.targets = this.physics.add.group({
      defaultKey: 'target',
      allowGravity: false,
      immovable: true,
      classType: Phaser.Physics.Arcade.Image,
    });

    this._loadLevel();

    this.physics.world.on('worldbounds', this._onArrowWorldBoundsCollide, this);

    this.physics.add.collider(this.arrow, this.targets, (arrow, target) => this._onArrowTargetCollide(arrow, target));
  }

  update() {
    if (this.arrow.body.allowGravity) {
      this.arrow.rotation = Phaser.Math.Angle.BetweenPoints(Phaser.Math.Vector2.ZERO, this.arrow.body.velocity);
    }

    const xScrollAmount = this.arrow.x - 50 - 400;
    if (xScrollAmount > 0) {
      this.cameras.main.scrollX = xScrollAmount;
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
      target.alpha = 1;
      target.active = true;
      target.body.enable = true;

      target.x = coordinates.x;
      target.y = coordinates.y;
    });
  }

  _onArrowWorldBoundsCollide() {
    const nextLives = this.registry.get('lives') - 1
    if (nextLives === 0) {
      this._endGame();
    }

    this.registry.set('lives', nextLives);

    this.arrow.body.allowGravity = false;
    this.arrow.body.enable = false;
    this._tweenFadeOut(this.arrow, () => this._resetArrow());
  }

  _onArrowTargetCollide(arrow, target) {
    this.registry.set('score', this.registry.get('score') + 10);

    this.arrow.body.allowGravity = false;
    this.arrow.body.enable = false;

    this._tweenFadeOut([arrow, target], () => {
      this._resetArrow();
      target.active = false;
      target.body.enable = false;

      if (this.targets.countActive() === 0) {
        this._loadNextLevel();
      }
    });
  }

  _angleArrowWithMouse(pointer) {
    const angle = Phaser.Math.Angle.BetweenPoints(this.arrow, pointer);
    this.arrow.rotation = angle;
  }

  _endGame() {
    this.scene.stop('game');
    this.scene.stop('ui');
    this.scene.start('results');
  }

  _resetArrow() {
    this.arrow.x = 50;
    this.arrow.y = 240;

    this.arrow.alpha = 1;

    this.arrow.body.enable = true;
    this.arrow.body.allowGravity = false;
    this.arrow.body.velocity.x = 0;
    this.arrow.body.velocity.y = 0;

    this._angleArrowWithMouse(this.input.mousePointer);

    this.tweens.add({
      targets: this.cameras.main,
      props: {
        scrollX: 0,
      },
      duration: 300,
      ease: Phaser.Math.Easing.Quadratic.Out,
      onComplete: () => {

        this.input.on('pointermove', this._angleArrowWithMouse, this);
        this.input.once('pointerdown', pointer => {
          this.input.off('pointermove', this._angleArrowWithMouse, this);

          this.arrow.body.allowGravity = true;
          this.physics.velocityFromRotation(this.arrow.rotation, 500, this.arrow.body.velocity)
        });
      },
    });

  }

  _tweenFadeOut(target, callback) {
    this.tweens.add({
      targets: target,
      props: {
        alpha: 0,
      },
      duration: 200,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.tweens.add({
          targets: target,
          props: {
            alpha: 0,
          },
          duration: 200,
          onComplete: () => {
            callback();
          },
        })
      },
    });
  }
}
