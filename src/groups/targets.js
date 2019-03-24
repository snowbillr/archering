import { config } from '../config';
import { Target } from '../entities/target';

export class Targets {
  constructor(scene) {
    this.scene = scene;
    this.targets = [];
  }

  getHitboxes() {
    return this.targets.map(target => target.getHitbox());
  }

  createTargetsForLevel(levelConfig) {
    levelConfig.targets.forEach(coordinates => {
      const target = new Target(this.scene, coordinates.x, config.layouts.game.targets.y)

      this.targets.push(target);
    });
  }

  resetTargetsForLevel(levelConfig) {
    // levelConfig.targets.forEach((coordinates, i) => {
      // const target = this.targets[i];
      // target.reset();
    // });
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
