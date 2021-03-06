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
      onCreate?: hitbox => void,
      shape?: 'rectangle'|'circle',
      xOffset: number,
      yOffset: number,
      width?: number,
      height?: number,
      radius?: number,
    }
   */
  add(sprite, hitboxConfig) {
    const { xOffset, yOffset, width, height } = hitboxConfig;
    const hitbox = this.scene.add.zone(sprite.x + xOffset, sprite.y + yOffset, width, height);
    this.scene.physics.add.existing(hitbox);

    if (hitboxConfig.shape === 'circle') {
      hitbox.body.setCircle(hitboxConfig.radius);
    }

    const parent = hitboxConfig.parent || sprite;
    hitbox.hitboxParent = parent;

    if (hitboxConfig.onCreate) {
      hitboxConfig.onCreate(hitbox);
    }

    this.hitboxes.push(Object.assign({}, hitboxConfig, { parent, sprite, hitbox }));

    return hitbox;
  }

  addGroup(sprite, hitboxConfigs, defaultConfig = {}) {
    const hitboxes = hitboxConfigs.map(hitboxConfig => {
      return this.add(sprite, Object.assign({}, hitboxConfig, defaultConfig));
    });

    return this.scene.physics.add.group(hitboxes);
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
