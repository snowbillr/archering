import Phaser from 'phaser';
import * as STATES from '../game-states';

const MAX_CHARGE = 700;

export class Arrow extends Phaser.Physics.Arcade.Sprite {
  constructor(scene) {
    super(scene, 0, 0, 'arrow');

    scene.sys.displayList.add(this);
    scene.sys.updateList.add(this);
    scene.physics.world.enableBody(this);

    this.releaseSounds = {
      low: scene.sound.add('arrow-release-low'),
      medium: scene.sound.add('arrow-release-medium'),
      high: scene.sound.add('arrow-release-high'),
    };

    this.setScale(0.75);
    this.body.collideWorldBounds = true;
    this.body.onWorldBounds = true;
    this.body.allowGravity = false;

    this.reset();
  }

  update() {
    const state = this.scene.registry.get('state');

    if (state === STATES.FLY) {
      this.rotation = Phaser.Math.Angle.BetweenPoints(Phaser.Math.Vector2.ZERO, this.body.velocity);
    }

    if (state === STATES.REST || state === STATES.CHARGE) {
      this.angleToPointer();
    }

    if (state === STATES.CHARGE) {
      const chargeAmount = this.scene.registry.get('charge');
      const newCharge = Phaser.Math.Clamp(chargeAmount + 5, 200, MAX_CHARGE);
      this.scene.registry.set('charge', newCharge);
    }
  }

  angleToPointer() {
    const angle = Phaser.Math.Angle.BetweenPoints(this, this.scene.input.activePointer);
    this.rotation = angle;
  }

  fire() {
    const chargePercent = this.scene.registry.get('charge') / MAX_CHARGE;
    if (chargePercent < 0.33) {
      this.releaseSounds.low.play();
    } else if (chargePercent < 0.66) {
      this.releaseSounds.medium.play();
    } else {
      this.releaseSounds.high.play();
    }

    this.body.allowGravity = true;
    this.scene.physics.velocityFromRotation(this.rotation, this.scene.registry.get('charge'), this.body.velocity)
  }

  reset() {
    this.scene.registry.set('charge', 200);

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
}
