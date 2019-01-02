import Phaser from 'phaser';

const STATES = {
  REST: 0,
  CHARGE: 1,
  FLY: 2,
  HIT: 3,
};

export class Arrow extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'arrow');
    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);
    scene.physics.world.enableBody(this);

    this.setScale(0.75);
    this.body.collideWorldBounds = true;
    this.body.onWorldBounds = true;
    this.body.allowGravity = false;

    this.state = STATES.REST;
  }

  destroy() {
    this.scene.input.off('pointermove', this.angleToPointer, this);
  }

  update() {
    if (this.state === STATES.FLY) {
      this.rotation = Phaser.Math.Angle.BetweenPoints(Phaser.Math.Vector2.ZERO, this.body.velocity);
    }
  }

  reset() {
    this.state = STATES.REST;
    this.body.enable = true;

    this.scene.input.on('pointermove', this.angleToPointer, this);

    this.scene.input.once('pointerdown', pointer => {
      this.scene.input.off('pointermove', this.angleToPointer, this);

      this.state = STATES.FLY;
      this.body.allowGravity = true;
      this.scene.physics.velocityFromRotation(this.rotation, 500, this.body.velocity)
    });

    this.x = 50;
    this.y = 240;

    this.alpha = 1;

    this.body.enable = true;
    this.body.allowGravity = false;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }

  onHit() {
    this.state = STATES.HIT;

    this.body.enable = false;
  }

  angleToPointer(pointer) {
    const angle = Phaser.Math.Angle.BetweenPoints(this, pointer);
    this.rotation = angle;
  }
}
