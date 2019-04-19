import { config } from '../config';
import { SkillButton } from './skill-button';

export class CannonballButton extends SkillButton {
  constructor(scene, skillManager, x, y) {
    super(scene, skillManager, x, y, config.registryKeys.skills.cannonball, Phaser.Input.Keyboard.KeyCodes.TWO);

    scene.add.image(x, y, 'cannonball')
      .setScale(0.35)
  }
}
