export class Target {
  constructor(scene, x, y) {
    this.scene = scene;

    this.sprite = scene.add.sprite(x, y, 'target');

    this.hitboxes = this.scene.arcadeHitbox.addGroup(this.sprite, [
      {
        xOffset: -1,
        yOffset: -25,
        width: 11,
        height: 15,
      },
      {
        xOffset: -3,
        yOffset: -11,
        width: 12,
        height: 12,
      },
      {
        xOffset: -3,
        yOffset: 3,
        width: 10,
        height: 13,
      },
    ], {
      parent: this,
      onCreate: hitbox => {
        hitbox.body.allowGravity = false;
        hitbox.body.immovable = true;
      }
    });
  }

  reset() {
    this.hitbox.body.enable = true;
    this.sprite.alpha = 1;
  }

  getSprite() {
    return this.sprite;
  }

  getHitboxes() {
    return this.hitboxes;
  }

  onHit() {
    this.getHitboxes().getChildren().forEach(hitbox => {
      hitbox.body.enable = false;
    });
  }
}
