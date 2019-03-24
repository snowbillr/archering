export class Target {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = scene.add.sprite(x, y, 'target');

    // const arcadeHitboxPlugin = new ArcadeHitboxPlugin(scene);
    this.scene.arcadeHitboxPlugin.addHitbox({
      sprite: this.sprite,
      parent: this,
      xOffset: -3,
      yOffset: -12,
      width: 12,
      height: 42,
    });

    // this.hitbox = this.scene.add.zone(x - 3, y - 12, 12, 42);
    // this.scene.physics.add.existing(this.hitbox);
    this.hitbox.body.allowGravity = false;
    this.hitbox.body.immovable = true;

    // this.hitbox.hitboxParent = this;
  }

  getSprite() {
    return this.sprite;
  }

  getHitbox() {
    return this.hitbox;
  }

  onHit() {
    this.getHitbox().body.enable = false;
  }
}
