export class SkillStoreScene extends Phaser.Scene {
  constructor() {
    super({ key: 'skill-store' });
  }

  create() {
    this.add.bitmapText(50, 40, 'font', 'Level Select', 24)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.scene.start('level-select');
      });
  }
}
