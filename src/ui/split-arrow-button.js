import { config } from '../config';
import { SkillButton } from './skill-button';
import { SplitArrowIcon } from './split-arrow-icon';

export class SplitArrowButton extends SkillButton {
  constructor(scene, skillManager, x, y) {
    super(scene, skillManager, x, y, config.registryKeys.skills.splitArrow, Phaser.Input.Keyboard.KeyCodes.THREE);

    new SplitArrowIcon(scene, x, y);
  }
}
