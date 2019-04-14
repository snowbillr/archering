export class Cannonball {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = scene.physics.add.sprite(x, y, 'cannonball')
      .setDisplaySize(32, 32)
      // .setCircle(32)

    this.hitbox = this.scene.arcadeHitbox.add(this.sprite, {
      parent: this,
      xOffset: 0,
      yOffset: 0,
      width: 32,
      height: 32,
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
