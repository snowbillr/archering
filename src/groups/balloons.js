import { Balloon } from '../entities/balloon';

export class Balloons {
  constructor(scene) {
    this.scene = scene;
    this.balloons = [];
  }

  createBalloonsForLevel(level) {
    if (!level.balloons) { return; }

    level.balloons.forEach(balloon => {
      this.balloons.push(new Balloon(this.scene, balloon.x, balloon.y));
    });
  }

  addOverlap(arrow, callback) {
    this.balloons.forEach(balloon => {
      this.scene.physics.add.overlap(arrow, balloon.balloon, arrow => callback(arrow, balloon));
    });
  }
}
