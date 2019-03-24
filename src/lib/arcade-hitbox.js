export class ArcadeHitboxPlugin {
  constructor(scene) {
    this.scene = scene;

    this.hitboxes = [];
  }

  /*
    Takes a HitboxConfig object
    {
      sprite: Phaser.GameObjects.Sprite,
      parent?: any,
      xOffset: number,
      yOffset: number,
      width: number,
      height: number,
    }
   */
  addHitbox(hitboxConfig) {
    const { sprite, xOffset, yOffset, width, height } = hitboxConfig;
    const hitbox = this.scene.add.zone(sprite.x + xOffset, sprite.y + yOffset, width, height);
    this.scene.physics.add.existing(hitbox);

    const parent = hitboxConfig.parent || hitboxConfig.sprite;
    this._extendParent(parent, hitbox);

    this.hitboxes.push(Object.assign({}, hitboxConfig, { hitbox }));
  }

  update() {
    this.hitboxes.forEach(this._syncHitbox);
  }

  _extendParent(parent, hitbox) {
    parent.hitbox = hitbox;
    hitbox.hitboxParent = parent;
  }

  _syncHitbox(hitboxConfig) {
    hitboxConfig.hitbox.x = hitboxConfig.sprite.x + hitboxConfig.xOffset;
    hitboxConfig.hitbox.y = hitboxConfig.sprite.y + hitboxConfig.yOffset;

    Phaser.Math.RotateAround(hitboxConfig.hitbox, hitboxConfig.sprite.x, hitboxConfig.sprite.y, hitboxConfig.sprite.rotation);
  }
}
