export class GameScene extends Phaser.Scene {
  preload() {
    this.load.image('target', 'assets/target.png');
    this.load.image('arrow', 'assets/arrow.png');
  }

  create() {
    this.input.setDefaultCursor('none');

    this.arrow = this.physics.add.image(50, 400, 'arrow');
    this.arrow.body.allowGravity = false;

    this.target = this.physics.add.image(600, 400, 'target');
    this.target.body.allowGravity = false;
    this.target.body.immovable = true;

    this.input.on('pointermove', this._angleArrowWithMouse, this);

    this.input.once('pointerdown', pointer => {
      this.input.off('pointermove', this._angleArrowWithMouse, this);

      this.arrow.body.allowGravity = true;
      this.physics.velocityFromRotation(this.arrow.rotation, 500, this.arrow.body.velocity)
    });

    this.physics.add.collider(this.arrow, this.target, (arrow, target) => {
      arrow.body.allowGravity = false;
      arrow.body.enable = false;
    });
  }

  _angleArrowWithMouse(pointer) {
    const angle = Phaser.Math.Angle.BetweenPoints(this.arrow, pointer);
    this.arrow.rotation = angle;
  }

  update() {
    if (this.arrow.body.allowGravity) {
      this.arrow.rotation = Phaser.Math.Angle.BetweenPoints(Phaser.Math.Vector2.ZERO, this.arrow.body.velocity);
    }
  }
}
