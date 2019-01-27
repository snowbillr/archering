import { Balloon } from '../entities/balloon';

export class Balloons {
  constructor(scene, level) {
    this.scene = scene;
    this.level = level;
    this.balloons = [];
  }

  createBalloonsForLevel() {
    if (!this.level.balloons) { return; }

    this.level.balloons.forEach(balloon => {
      this.balloons.push(new Balloon(this.scene, balloon.x, balloon.y));
    });
  }

  getFurthestBalloonX() {
    return this.level.balloons.reduce((furthestX, balloon) => {
      if (balloon.x > furthestX) {
        return balloon.x;
      } else {
        return furthestX;
      }
    }, 0);
  }

  addBalloonOverlap(arrow, callback) {
    this.balloons.forEach(balloon => {
      this.scene.physics.add.overlap(arrow, balloon.balloon, arrow => callback(arrow, balloon));
    });
  }

  addStringOverlap(arrow, callback) {
    this.balloons.forEach(balloon => {
      this.scene.physics.add.overlap(arrow, balloon.string, arrow => callback(arrow, balloon));
    });
  }
}
