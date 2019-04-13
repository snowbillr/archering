import Phaser from 'phaser';
import * as STATES from '../level-states';
import { config } from '../config';

const arrowLayoutConfig = config.layouts.level.arrow;
const arrowConfig = config.entities.level.arrow;

export class Arrow {
  constructor(scene) {
    this.scene = scene;

    this.sprite = this.scene.physics.add.sprite(0, 0, 'arrow');
    this.sprite.setDisplaySize(48, 12);

    this.hitbox = this.scene.arcadeHitbox.add(this.sprite, {
      parent: this,
      xOffset: 24,
      yOffset: 0,
      width: 6,
      height: 6,
    });

    this.releaseSounds = {
      low: this.scene.sound.add('arrow-release-low'),
      medium: this.scene.sound.add('arrow-release-medium'),
      high: this.scene.sound.add('arrow-release-high'),
    };

    this.scene.registry.events.on(`changedata-${config.registryKeys.level.skills.spectralArrow}`, this._updateTextureForSkill, this);

    this.reset();
  }

  cleanupRegistryListeners() {
    this.scene.registry.events.off(`changedata-${config.registryKeys.level.skills.spectralArrow}`, this._updateTextureForSkill);
  }

  _updateTextureForSkill(parent, spectralArrow) {
    if (spectralArrow) {
      this.sprite.setTexture('arrow-glow');
    } else {
      this.sprite.setTexture('arrow');
    }
  }

  update() {
    const state = this.scene.registry.get(config.registryKeys.level.state);

    if (state === STATES.FLY) {
      this.sprite.rotation = Phaser.Math.Angle.BetweenPoints(Phaser.Math.Vector2.ZERO, this.sprite.body.velocity);
    }

    if (state === STATES.REST || state === STATES.CHARGE) {
      this._angleToPointer();
    }

    if (state === STATES.CHARGE) {
      const chargeAmount = this.scene.registry.get(config.registryKeys.level.arrow.charge);
      const newCharge = Phaser.Math.Clamp(chargeAmount + 5, arrowConfig.minCharge, arrowConfig.maxCharge);
      this.scene.registry.set(config.registryKeys.level.arrow.charge, newCharge);
    }
  }

  getSprite() {
    return this.sprite;
  }

  getHitbox() {
    return this.hitbox;
  }

  fire() {
    const chargePercent = (this.scene.registry.get(config.registryKeys.level.arrow.charge) - arrowConfig.minCharge) / (arrowConfig.maxCharge - arrowConfig.minCharge);
    if (chargePercent < 0.33) {
      this.releaseSounds.low.play();
    } else if (chargePercent < 0.66) {
      this.releaseSounds.medium.play();
    } else {
      this.releaseSounds.high.play();
    }

    this.hitbox.body.enable = true;
    this.sprite.body.allowGravity = true;
    this.scene.physics.velocityFromRotation(this.sprite.rotation, this.scene.registry.get(config.registryKeys.level.arrow.charge), this.sprite.body.velocity)
  }

  reset() {
    this.scene.registry.set(config.registryKeys.level.arrow.charge, arrowConfig.minCharge);

    this.sprite.body.enable = true;
    this.hitbox.body.enable = false;

    this.sprite.x = arrowLayoutConfig.x;
    this.sprite.y = arrowLayoutConfig.y;

    this.sprite.alpha = 1;

    this.sprite.body.allowGravity = false;
    this.sprite.body.velocity.x = 0;
    this.sprite.body.velocity.y = 0;

    this.hitbox.body.allowGravity = false;
  }

  onHit() {
    this.sprite.body.enable = false;
    this.hitbox.body.enable = false;
  }

  _angleToPointer() {
    const angle = Phaser.Math.Angle.BetweenPoints(this.sprite, this.scene.input.activePointer);
    this.sprite.rotation = angle;
  }
}
