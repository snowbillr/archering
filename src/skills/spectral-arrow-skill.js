import * as STATES from '../level-states';

export class SpectralArrowSkill {
  constructor(scene) {
    this.scene = scene;

    this.validStates = [STATES.REST, STATES.CHARGE, STATES.FLY];
  }

  activate() {
    this.scene.arrow.activateSpectralArrowSprite();
  }

  update() {
    // no op
  }

  deactivate() {
    this.scene.arrow.deactivateSpectralArrowSprite();
  }
}
