import { config } from '../config';
import { SkillButton } from './skill-button';

export class SplitArrowButton extends SkillButton {
  constructor(scene, skillManager, x, y) {
    super(scene, skillManager, x, y, config.registryKeys.skills.splitArrow, Phaser.Input.Keyboard.KeyCodes.THREE);

    scene.add.image(x, y, 'arrow')
      .setAngle(-55)
      .setScale(0.35);

    scene.add.image(x, y, 'arrow')
      .setAngle(-15)
      .setScale(0.35);
  }
}
