export class Target {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = scene.add.sprite(x, y, 'target');

    this.scene.arcadeHitbox.addHitbox({
      sprite: this.sprite,
      parent: this,
      xOffset: -3,
      yOffset: -12,
      width: 12,
      height: 42,
    });

    this.hitbox.body.allowGravity = false;
    this.hitbox.body.immovable = true;
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
