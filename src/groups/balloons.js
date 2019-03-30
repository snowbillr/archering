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

  addBalloonOverlap(arrow, callback) {
    this.balloons.forEach(balloon => {
      this.scene.physics.add.overlap(arrow, balloon.balloon.hitbox, arrow => callback(arrow, balloon));
    });
  }

  addStringOverlap(arrow, callback) {
    this.balloons.forEach(balloon => {
      this.scene.physics.add.overlap(arrow, balloon.string.hitbox, arrow => callback(arrow, balloon));
    });
  }
}
