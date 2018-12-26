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

    this.target = this.physics.add.image(600, 400, 'target');
    this.target.body.allowGravity = false;
    this.target.body.immovable = true;

    this._resetArrow();
    this._setTargetToRandomPosition();

    this.physics.world.on('worldbounds', this._onArrowWorldBoundsCollide, this);

    this.physics.add.collider(this.arrow, this.target, () => this._onArrowTargetCollide());
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

    this._resetForNextLife();
  }

  _onArrowTargetCollide() {
    this.registry.set('score', this.registry.get('score') + 10);

    this._resetForNextLife();
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

  _resetForNextLife() {
    this.arrow.body.allowGravity = false;
    this.arrow.body.enable = false;

    this.tweens.add({
      targets: [this.arrow, this.target],
      props: {
        alpha: 0,
      },
      duration: 200,
      yoyo: true,
      repeat: 1,
      onComplete: () => {
        this.tweens.add({
          targets: [this.arrow, this.target],
          props: {
            alpha: 0,
          },
          duration: 200,
          onComplete: () => {
            this._resetArrow();
            this._setTargetToRandomPosition();
          },
        })
      },
    });
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

  _setTargetToRandomPosition() {
    this.target.x = Phaser.Math.RND.integerInRange(500, 650);
    this.target.y = Phaser.Math.RND.integerInRange(300, 500);

    this.target.alpha = 1;
  }
}
