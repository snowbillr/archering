export class SkillButton {
  constructor(scene, x, y, iconKey, skillConfigKey, skill) {
    this.scene = scene;
    this.skillKey = skillConfigKey;
    this.skill = skill;

    this.background = this.scene.add.image(x, y, 'skill-background')
      .setDisplaySize(42, 42);
    this.icon = this.scene.add.image(x, y, iconKey)
      .setScale(0.45)
      .setAngle(-45);

    this.chargeCountText = this.scene.add.bitmapText(x + 16, y + 16, 'font', '', 12)
      .setOrigin(1, 1);

    this.clickZone = this.scene.add.zone(x, y, 42, 42)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', this.onUse, this);

    this.scene.registry.events.on(`changedata-${skillConfigKey}`, this._updateButton, this);
    this._updateButton(null, this.scene.registry.get(skillConfigKey));
  }

  onUse() {
    this.skill.activate();
  }

  _updateButton(parent, skillConfig) {
    if (skillConfig.chargeCount === 0) {
      this.background.setTint(0xcccccc);
      this.icon.setTint(0xcccccc);
    }

    this.chargeCountText.text = skillConfig.chargeCount;
  }

  cleanupRegistryListeners() {
    this.scene.registry.events.off(`changedata-${this.skillKey}`, this._updateButton);
  }
}
