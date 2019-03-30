import { config } from '../config';

export class GroundZone extends Phaser.GameObjects.Zone {
  constructor(scene) {
    super(scene, config.layouts.level.groundZone.x, config.layouts.level.groundZone.y);

    scene.add.existing(this);

    this.setSize(config.layouts.level.groundZone.width, config.layouts.level.groundZone.height);
    this.setScrollFactor(0);

    scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
  }

  updatePosition(x) {
    this.x = x;
  }
}
