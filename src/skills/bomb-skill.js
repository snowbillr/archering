import { config } from '../config';
import { Bomb } from '../entities/bomb';

const SKILL_CONFIG_KEY = config.registryKeys.skills.bomb;
const LEVEL_KEY = config.registryKeys.level.skills.bomb;

export class BombSkill {
  constructor(scene) {
    this.scene = scene;
  }

  activate() {
    const levelScene = this.scene.scene.get('level');
    const bomb = new Bomb(this.scene, 200, 100);

    const ground = levelScene.groundZone;
    const targets = levelScene.targets;
    const balloons = levelScene.balloons;

    this.scene.physics.add.collider(bomb.sprite, ground);

    // TODO: balloons

    /*
     * This is a bug with 3.16.2.
     * It looks like if the first arg is a circle, the second arg can't be a group.
     * So the workaround is to iterate over the group and add individual colliders.
    */
    // this.scene.physics.add.collider(bomb.sprite, targets.getHitboxes());
    targets.getHitboxes().forEach(group => {
      group.children.entries.forEach(zone => {
        this.scene.physics.add.collider(bomb.sprite, zone);
      });
    });
    this.scene.physics.add.collider(bomb.sprite, targets.getBullseyeHitboxes());
  }
}
