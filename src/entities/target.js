export class Target {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = scene.add.sprite(x, y, 'target');

    this.hitbox = this.scene.arcadeHitbox.add(this.sprite, {
      parent: this,
      xOffset: -3,
      yOffset: -12,
      width: 12,
      height: 42,
    });

    this.hitbox.body.allowGravity = false;
    this.hitbox.body.immovable = true;
  }

  reset() {
    this.hitbox.body.enable = true;
    this.sprite.alpha = 1;
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
