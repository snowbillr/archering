import { config } from '../config';
import { SpectralArrowSkill } from './spectral-arrow-skill';
import { SplitArrowSkill } from './split-arrow-skill';
import { CannonballSkill } from './cannonball-skill';

export class SkillManager {
  constructor(scene) {
    this.scene = scene;

    this.skills = {
      [config.registryKeys.skills.spectralArrow]: {
        skill: new SpectralArrowSkill(this.scene),
        isActive: false,
      },
      [config.registryKeys.skills.cannonball]: {
        skill: new CannonballSkill(this.scene),
        isActive: false,
      },
      [config.registryKeys.skills.splitArrow]: {
        skill: new SplitArrowSkill(this.scene),
        isActive: false,
      },
    };
  }

  canActivate(skillKey) {
    const hasCharges = this.scene.registry.get(skillKey).chargeCount > 0;
    const sceneIsInValidState = this.skills[skillKey].skill.validStates.includes(this.scene.registry.get(config.registryKeys.level.state));

    return hasCharges && sceneIsInValidState;
  }

  activate(skillKey) {
    const skillConfig = this.scene.registry.get(skillKey);
    skillConfig.chargeCount -= 1;

    this.scene.registry.set(skillKey, skillConfig);
    this.skills[skillKey].isActive = true;

    this.skills[skillKey].skill.activate();
  }

  update() {
    Object.values(this.skills)
      .filter(s => s.isActive)
      .forEach(s => s.skill.update());
  }

  isActive(skillKey) {
    return this.skills[skillKey].isActive;
  }

  deactivateAll() {
    this.skills[config.registryKeys.skills.spectralArrow].isActive = false;
    this.skills[config.registryKeys.skills.spectralArrow].skill.deactivate();

    this.skills[config.registryKeys.skills.cannonball].isActive = false;
    this.skills[config.registryKeys.skills.cannonball].skill.deactivate();

    this.skills[config.registryKeys.skills.splitArrow].isActive = false;
    this.skills[config.registryKeys.skills.splitArrow].skill.deactivate();
  }
}
