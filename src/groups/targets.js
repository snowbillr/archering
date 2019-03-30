import { config } from '../config';
import { Target } from '../entities/target';

export class Targets {
  constructor(scene) {
    this.scene = scene;
    this.targets = [];
  }

  getHitboxes() {
    return this.targets.map(target => target.getHitboxes());
  }

  getBullseyeHitboxes() {
    return this.targets.map(target => target.getBullseyeHitbox());
  }

  createTargetsForLevel(levelConfig) {
    levelConfig.targets.forEach(coordinates => {
      const target = new Target(this.scene, coordinates.x, config.layouts.level.targets.y)

      this.targets.push(target);
    });
  }

  resetTargetsForLevel() {
    this.targets.forEach(target => target.reset());
  }

  getFurthestTargetX() {
    return this.targets.reduce((furthestX, target) => {
      if (target.getSprite().x > furthestX) {
        return target.getSprite().x;
      } else {
        return furthestX;
      }
    }, 0);
  }
}
