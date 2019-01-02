import Phaser from 'phaser';
import * as STATES from '../game-states';

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
  }

  destroy() {
    this.scene.input.off('pointermove', this.angleToPointer, this);
  }

  update() {
    if (this.scene.registry.get('state') === STATES.FLY) {
      this.rotation = Phaser.Math.Angle.BetweenPoints(Phaser.Math.Vector2.ZERO, this.body.velocity);
    }
  }

  fire() {
    this.body.allowGravity = true;
    this.scene.physics.velocityFromRotation(this.rotation, this.scene.registry.get('charge'), this.body.velocity)
  }

  reset() {
    this.body.enable = true;

    this.x = 50;
    this.y = 240;

    this.alpha = 1;

    this.body.enable = true;
    this.body.allowGravity = false;
    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
  }

  onHit() {
    this.body.enable = false;
  }

  angleToPointer(pointer) {
    if (this.scene.registry.get('state') === STATES.REST
        || this.scene.registry.get('state') === STATES.CHARGE) {
      const angle = Phaser.Math.Angle.BetweenPoints(this, pointer);
      this.rotation = angle;
    }
  }
}
