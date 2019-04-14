import { Balloon } from '../entities/balloon';

export class Balloons {
  constructor(scene) {
    this.scene = scene;
    this.balloons = [];
  }

  createBalloonsForLevel(levelConfig) {
    if (!levelConfig.balloons) { return; }

    levelConfig.balloons.forEach(balloon => {
      this.balloons.push(new Balloon(this.scene, balloon.x, balloon.y));
    });
  }

  resetBalloonsForLevel(levelConfig) {
    if (!levelConfig.balloons) { return; }

    levelConfig.balloons.forEach((balloon, index) => {
      this.balloons[index].reset(balloon.x, balloon.y);
    });
  }

  getFurthestBalloonX() {
    return this.balloons.reduce((furthestX, balloon) => {
      if (balloon.balloon.x > furthestX) {
        return balloon.balloon.x;
      } else {
        return furthestX;
      }
    }, 0);
  }

  getBalloonHitboxes() {
    return this.balloons.map(balloon => balloon.balloon.hitbox);
  }

  getStringHitboxes() {
    return this.balloons.map(balloon => balloon.string.hitbox);
  }
}
