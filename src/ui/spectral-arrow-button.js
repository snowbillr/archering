import { config } from '../config';
import { SkillButton } from './skill-button';
import { SpectralArrowIcon } from './spectral-arrow-icon';

export class SpectralArrowButton extends SkillButton {
  constructor(scene, skillManager, x, y) {
    super(scene, skillManager, x, y, config.registryKeys.skills.spectralArrow, Phaser.Input.Keyboard.KeyCodes.ONE);

    new SpectralArrowIcon(scene, x, y);
  }
}
