export class Cannonball {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = scene.physics.add.sprite(x, y, 'cannonball')
      .setDisplaySize(32, 32)

    this.hitbox = this.scene.arcadeHitbox.add(this.sprite, {
      parent: this,
      xOffset: -16,
      yOffset: -16,
      shape: 'circle',
      radius: 16,
      onCreate: hitbox => {
        hitbox.body.allowGravity = false;
      }
    });
  }

  onHit() {
    this.sprite.body.enable = false;
    this.sprite.body.allowGravity = false;

    this.hitbox.body.enable = false;
  }
}
