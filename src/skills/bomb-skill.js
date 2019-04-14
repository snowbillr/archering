import { config } from '../config';

const SKILL_CONFIG_KEY = config.registryKeys.skills.bomb;
const LEVEL_KEY = config.registryKeys.level.skills.bomb;

export class BombSkill {
  constructor(scene) {
    this.scene = scene;
  }

  activate() {
    console.log('boom')
  }
}