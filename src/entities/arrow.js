import Phaser from 'phaser';
import * as STATES from '../game-states';
import { config } from '../config';

const arrowLayoutConfig = config.layouts.game.arrow;
const arrowConfig = config.entities.game.arrow;

export class Arrow {
  constructor(scene) {
    this.scene = scene;

    this.sprite = this.scene.physics.add.sprite(0, 0, 'arrow');
    this.sprite.setDisplaySize(48, 12);

    this.hitbox = this.scene.add.zone(0, 0, 12, 12);
    this.scene.physics.add.existing(this.hitbox);

    this.releaseSounds = {
      low: this.scene.sound.add('arrow-release-low'),
      medium: this.scene.sound.add('arrow-release-medium'),
      high: this.scene.sound.add('arrow-release-high'),
    };

    this.reset();
  }

  update() {
    const state = this.scene.registry.get('state');

    if (state === STATES.FLY) {
      this.sprite.rotation = Phaser.Math.Angle.BetweenPoints(Phaser.Math.Vector2.ZERO, this.sprite.body.velocity);
      this.syncHitbox();
    }

    if (state === STATES.REST || state === STATES.CHARGE) {
      this.angleToPointer();
      this.syncHitbox();
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

  syncHitbox() {
    const angle = this.sprite.rotation;
    const magnitude = 24;

    const x = Math.cos(angle) * magnitude;
    const y = Math.sin(angle) * magnitude;

    this.hitbox.x = this.sprite.x + x;
    this.hitbox.y = this.sprite.y + y;
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

    this.hitbox.body.enable = true;
    this.sprite.body.allowGravity = true;
    this.scene.physics.velocityFromRotation(this.sprite.rotation, this.scene.registry.get('charge'), this.sprite.body.velocity)
  }

  reset() {
    this.scene.registry.set('charge', arrowConfig.minCharge);

    this.sprite.body.enable = true;
    this.hitbox.body.enable = false;

    this.sprite.x = arrowLayoutConfig.x;
    this.sprite.y = arrowLayoutConfig.y;

    this.sprite.alpha = 1;

    this.sprite.body.allowGravity = false;
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;

    this.hitbox.body.allowGravity = false;

    this.syncHitbox();
  }

  onHit() {
    this.sprite.body.enable = false;
    this.hitbox.body.enable = false;
  }
}
