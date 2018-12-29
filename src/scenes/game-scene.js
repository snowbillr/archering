export class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'game' })
  }

  preload() {
    this.load.image('target', 'assets/target.png');
    this.load.image('arrow', 'assets/arrow.png');
  }

  create() {
    this.registry.set('score', 0);
    this.registry.set('lives', 3);
    this.scene.launch('ui');

    this.input.setDefaultCursor('crosshair');

    this.physics.world.setBounds(0, 0, 640, 480);

    this.arrow = this.physics.add.image(50, 400, 'arrow');
    this.arrow.body.collideWorldBounds = true;
    this.arrow.body.onWorldBounds = true;
    this.arrow.setScale(0.75);
    this.arrow.body.allowGravity = false;

    this.targets = this.physics.add.group({
      allowGravity: false,
      immovable: true,
      classType: Phaser.Physics.Arcade.Image,
    });
    this.targets.createMultiple({
      key: 'target',
      repeat: 2,
    });
    this.targets.getChildren().forEach((target, i) => {
      target.x = ((1 + i) * 100) + 300;
      target.y = 400;
    });

    this._resetArrow();

    this.physics.world.on('worldbounds', this._onArrowWorldBoundsCollide, this);

    this.physics.add.collider(this.arrow, this.targets, (arrow, target) => this._onArrowTargetCollide(arrow, target));
  }

  update() {
    if (this.arrow.body.allowGravity) {
      this.arrow.rotation = Phaser.Math.Angle.BetweenPoints(Phaser.Math.Vector2.ZERO, this.arrow.body.velocity);
    }
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
    })
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
    this.arrow.y = 400;

    this.arrow.alpha = 1;

    this.arrow.body.enable = true;
    this.arrow.body.allowGravity = false;
    this.arrow.body.velocity.x = 0;
    this.arrow.body.velocity.y = 0;

    this._angleArrowWithMouse(this.input.mousePointer);

    this.input.on('pointermove', this._angleArrowWithMouse, this);

    this.input.once('pointerdown', pointer => {
      this.input.off('pointermove', this._angleArrowWithMouse, this);

      this.arrow.body.allowGravity = true;
      this.physics.velocityFromRotation(this.arrow.rotation, 500, this.arrow.body.velocity)
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
