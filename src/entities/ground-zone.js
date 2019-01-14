export class GroundZone extends Phaser.GameObjects.Zone {
  constructor(scene) {
    super(scene, 0, 260);

    scene.add.existing(this);

    this.setSize(640, 40);
    this.setScrollFactor(0);

    scene.physics.world.enable(this);
    this.body.allowGravity = false;
    this.body.immovable = true;
  }

  updatePosition(x) {
    this.x = x;
  }
}
