import { config } from '../config';

export class GroundZone extends Phaser.GameObjects.Zone {
  constructor(scene) {
    super(scene, config.layouts.game.groundZone.x, config.layouts.game.groundZone.y);

    scene.add.existing(this);

    this.setSize(config.layouts.game.groundZone.width, config.layouts.game.groundZone.height);
    this.setScrollFactor(0);

    scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
  }

  updatePosition(x) {
    this.x = x;
  }
}
