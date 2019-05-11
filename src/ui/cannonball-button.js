import { config } from '../config';
import { SkillButton } from './skill-button';
import { CannonballIcon } from './cannonball-icon';

export class CannonballButton extends SkillButton {
  constructor(scene, skillManager, x, y) {
    super(scene, skillManager, x, y, config.registryKeys.skills.cannonball, Phaser.Input.Keyboard.KeyCodes.TWO);

    new CannonballIcon(scene, x, y);
  }
}
