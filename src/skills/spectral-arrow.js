import { config } from '../config';

const LEVEL_KEY = config.registryKeys.level.skills.spectralArrow;

export class SpectralArrow {
  constructor(scene) {
    this.scene = scene;
  }

  activate() {
    this.scene.registry.set(LEVEL_KEY, true);
  }
}
