export class GameScene extends Phaser.Scene {
  preload() {
    this.load.image('target', 'assets/target.png');
    this.load.image('arrow', 'assets/arrow.png');
  }

  create() {
    this.input.setDefaultCursor('none');

    this.arrow = this.physics.add.image(50, 240, 'arrow');
    this.arrow.body.allowGravity = false;

    this.target = this.physics.add.image(600, 240, 'target');
    this.target.body.allowGravity = false;
    this.target.body.immovable = true;

    this.input.on('pointermove', this._moveArrowWithMouse, this);

    this.input.on('pointerdown', pointer => {
      this.arrow.body.allowGravity = true;
      this.arrow.body.velocity.x = 600;
    });

    this.physics.add.collider(this.arrow, this.target, (arrow, target) => {
      arrow.body.enable = false;
      this.input.off('pointermove', this._moveArrowWithMouse, this);
    });
  }

  _moveArrowWithMouse(pointer) {
    this.arrow.y = pointer.y;
  }
}
