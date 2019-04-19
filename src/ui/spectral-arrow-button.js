import { config } from '../config';
import { SkillButton } from './skill-button';

export class SpectralArrowButton extends SkillButton {
  constructor(scene, skillManager, x, y) {
    super(scene, skillManager, x, y, config.registryKeys.skills.spectralArrow, Phaser.Input.Keyboard.KeyCodes.ONE);

    scene.add.image(x, y, 'arrow-glow')
      .setScale(0.45)
      .setAngle(-45);
  }
}
