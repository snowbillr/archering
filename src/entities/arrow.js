import Phaser from 'phaser';
import * as STATES from '../game-states';
import { config } from '../config';

const arrowLayoutConfig = config.layouts.game.arrow;
const arrowConfig = config.entities.game.arrow;

export class Arrow {
  constructor(scene) {
    this.scene = scene;
    this.sprite = this.scene.physics.add.sprite(0, 0, 'arrow');
    this.hitbox = this.scene.add.zone(0, 0, 12, 12);
    this.scene.physics.add.existing(this.hitbox);

    this.releaseSounds = {
      low: this.scene.sound.add('arrow-release-low'),
      medium: this.scene.sound.add('arrow-release-medium'),
      high: this.scene.sound.add('arrow-release-high'),
    };

    this.sprite.setDisplaySize(48, 12);
    this.sprite.body.allowGravity = false;
    this.hitbox.body.allowGravity = false;

    this.reset();
  }

  update() {
    const state = this.scene.registry.get('state');

    if (state === STATES.FLY) {
      this.sprite.rotation = Phaser.Math.Angle.BetweenPoints(Phaser.Math.Vector2.ZERO, this.sprite.body.velocity);
    }

    if (state === STATES.REST || state === STATES.CHARGE) {
      this.angleToPointer();
    }

    if (state === STATES.CHARGE) {
      const chargeAmount = this.scene.registry.get('charge');
      const newCharge = Phaser.Math.Clamp(chargeAmount + 5, arrowConfig.minCharge, arrowConfig.maxCharge);
      this.scene.registry.set('charge', newCharge);
    }
  }

  getSprite() {
    return this.sprite;
  }

  getHitbox() {
    return this.hitbox;
  }

  angleToPointer() {
    const angle = Phaser.Math.Angle.BetweenPoints(this.sprite, this.scene.input.activePointer);
    this.sprite.rotation = angle;
  }

  fire() {
    const chargePercent = (this.scene.registry.get('charge') - arrowConfig.minCharge) / (arrowConfig.maxCharge - arrowConfig.minCharge);
    if (chargePercent < 0.33) {
      this.releaseSounds.low.play();
    } else if (chargePercent < 0.66) {
      this.releaseSounds.medium.play();
    } else {
      this.releaseSounds.high.play();
    }

    this.sprite.body.allowGravity = true;
    this.hitbox.body.allowGravity = true;
    this.scene.physics.velocityFromRotation(this.sprite.rotation, this.scene.registry.get('charge'), this.sprite.body.velocity)
    this.scene.physics.velocityFromRotation(this.sprite.rotation, this.scene.registry.get('charge'), this.hitbox.body.velocity)
  }

  reset() {
    this.scene.registry.set('charge', arrowConfig.minCharge);

    this.sprite.body.enable = true;
    this.hitbox.body.enable = true;

    this.sprite.x = arrowLayoutConfig.x;
    this.sprite.y = arrowLayoutConfig.y;
    this.hitbox.x = arrowLayoutConfig.x + 36;
    this.hitbox.y = arrowLayoutConfig.y;

    this.sprite.alpha = 1;
    this.hitbox.alpha = 1;

    this.sprite.body.enable = true;
    this.sprite.body.allowGravity = false;
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;
    this.hitbox.body.enable = true;
    this.hitbox.body.allowGravity = false;
    this.hitbox.body.velocity.x = 0;
    this.hitbox.body.velocity.y = 0;
  }

  onHit() {
    this.sprite.body.enable = false;
    this.hitbox.body.enable = false;
  }
}
