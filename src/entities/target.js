export class Target {
  constructor(scene, x, y) {
    this.wasHit = false;

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

    this.bullseyeHitbox = this.scene.arcadeHitbox.add(this.sprite, {
      parent: this,
      xOffset: -3,
      yOffset: -11,
      width: 12,
      height: 12,
      onCreate: hitbox => {
        hitbox.body.allowGravity = false;
        hitbox.body.immovable = true;
      }
    });
  }

  reset() {
    this.sprite.alpha = 1;
    this.bullseyeHitbox.body.enable = true;
    this.hitboxes.children.each(hitbox => {
      hitbox.body.enable = true;
    });
  }

  getSprite() {
    return this.sprite;
  }

  getHitboxes() {
    return this.hitboxes;
  }

  getBullseyeHitbox() {
    return this.bullseyeHitbox;
  }

  onHit() {
    if (this.wasHit) { return; }
    this.wasHit = true;

    this.getHitboxes().getChildren().forEach(hitbox => {
      hitbox.body.enable = false;
    });

    this.getBullseyeHitbox().body.enable = false;
  }
}
