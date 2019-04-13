export class SkillButton {
  constructor(scene, x, y, iconKey, registryKey) {
    this.scene = scene;

    const background = this.scene.add.image(x, y, 'skill-background')
      .setDisplaySize(42, 42);
    const icon = this.scene.add.image(x, y, iconKey)
      .setScale(0.4)
      .setAngle(-45);

    const clickZone = this.scene.add.zone(x, y, 42, 42)
      .setInteractive({ cursor: 'pointer' })
      .once('pointerdown', () => {
        this.scene.registry.set(registryKey, true);
      }, this.scene)
  }
}
