export class ArcadeHitboxPlugin extends Phaser.Plugins.ScenePlugin {
  constructor(scene, pluginManager) {
    super(scene, pluginManager);

    this.hitboxes = [];

    this.scene.events.on('update', () => this._update());
    this.scene.events.on('shutdown', () => this._shutdown());
    this.scene.events.on('destroy', () => this._destroy());
  }

  /*
    Takes a HitboxConfig object
    {
      parent?: any,
      xOffset: number,
      yOffset: number,
      width: number,
      height: number,
    }
   */
  add(sprite, hitboxConfig) {
    const { xOffset, yOffset, width, height } = hitboxConfig;
    const hitbox = this.scene.add.zone(sprite.x + xOffset, sprite.y + yOffset, width, height);
    this.scene.physics.add.existing(hitbox);

    const parent = hitboxConfig.parent || sprite;
    hitbox.hitboxParent = parent;

    this.hitboxes.push(Object.assign({}, hitboxConfig, { parent, sprite, hitbox }));

    return hitbox;
  }

  _update() {
    this.hitboxes.forEach(this._syncHitbox);
  }

  _syncHitbox(hitboxConfig) {
    hitboxConfig.hitbox.x = hitboxConfig.sprite.x + hitboxConfig.xOffset;
    hitboxConfig.hitbox.y = hitboxConfig.sprite.y + hitboxConfig.yOffset;

    Phaser.Math.RotateAround(hitboxConfig.hitbox, hitboxConfig.sprite.x, hitboxConfig.sprite.y, hitboxConfig.sprite.rotation);
  }

  _shutdown() {
    this.hitboxes.forEach(hitboxConfig => {
      this.scene.physics.world.disableBody(hitboxConfig.hitbox.body);

      const parent = hitboxConfig.parent || hitboxConfig.sprite;
      delete parent.hitbox;
      delete hitboxConfig.hitbox.hitboxParent;
    });

    this.hitboxes.splice(0, this.hitboxes.length);
  }

  _destroy() {
    this._shutdown();
    delete this.hitboxes;
  }
}
