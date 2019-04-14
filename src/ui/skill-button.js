import * as STATES from '../level-states';
import { config } from '../config';

export class SkillButton {
  constructor(scene, x, y, iconKey, skillConfigKey, skill, shortcutKey, validStates) {
    this.scene = scene;
    this.skillConfigKey = skillConfigKey;
    this.skill = skill;
    this.validStates = validStates;

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
    this.shortcutKey = this.scene.input.keyboard.addKey(shortcutKey).on('down', this.onUse, this);

    this.scene.registry.events.on(`changedata-${skillConfigKey}`, this._updateButton, this);
    this._updateButton(null, this.scene.registry.get(skillConfigKey));
  }

  onUse() {
    const skillConfig = this.scene.registry.get(this.skillConfigKey);

    const hasCharges = skillConfig.chargeCount > 0;
    const isValidState = this.validStates == null ? true : this.validStates.includes(this.scene.registry.get(config.registryKeys.level.state));

    if (hasCharges && isValidState) {
      skillConfig.chargeCount -= 1;
      this.scene.registry.set(this.skillConfigKey, skillConfig);

      this.skill.activate();
    }
  }

  _updateButton(parent, skillConfig) {
    if (skillConfig.chargeCount === 0) {
      this.background.setTint(0xcccccc);
      this.icon.setTint(0xcccccc);
    }

    this.chargeCountText.text = skillConfig.chargeCount;
  }

  cleanupRegistryListeners() {
    this.scene.registry.events.off(`changedata-${this.skillConfigKey}`, this._updateButton);
  }
}
