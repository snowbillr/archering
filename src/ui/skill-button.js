export class SkillButton {
  constructor(scene, x, y, iconKey, levelKey, skillKey) {
    this.scene = scene;
    this.levelKey = levelKey;
    this.skillKey = skillKey;

    const background = this.scene.add.image(x, y, 'skill-background')
      .setDisplaySize(42, 42);
    const icon = this.scene.add.image(x, y, iconKey)
      .setScale(0.45)
      .setAngle(-45);

    const chargeCount = this.scene.registry.get(skillKey).chargeCount;
    this.chargeCountText = this.scene.add.bitmapText(x + 16, y + 16, 'font', chargeCount, 12)
      .setOrigin(1, 1);

    const clickZone = this.scene.add.zone(x, y, 42, 42)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', this.onUse, this);
  }

  onUse() {
    this.scene.registry.set(this.levelKey, true);

    const skillConfig = this.scene.registry.get(this.skillKey);
    skillConfig.chargeCount -= 1;

    this.chargeCountText.text = skillConfig.chargeCount;
    this.scene.registry.set(this.skillKey, skillConfig);
  }
}
