import { config } from '../config';
import { Cannonball } from '../entities/cannonball';
import { CannonballGroundCollider } from '../colliders/cannonball-ground-collider';

const SKILL_CONFIG_KEY = config.registryKeys.skills.cannonball;
const LEVEL_KEY = config.registryKeys.level.skills.cannonball;

export class CannonballSkill {
  constructor(scene) {
    this.scene = scene;
  }

  activate() {
    const levelScene = this.scene.scene.get('level');
    const cannonball = new Cannonball(levelScene, levelScene.arrow.getSprite().x, levelScene.arrow.getSprite().y);

    const ground = levelScene.groundZone;
    const targets = levelScene.targets;
    const balloons = levelScene.balloons;

    const cannonballGroundCollider = new CannonballGroundCollider();
    levelScene.physics.add.collider(cannonball.sprite, ground, cannonballGroundCollider.onHit);

    // TODO: balloons

    /*
     * This is a bug with 3.16.2.
     * It looks like if the first arg is a circle, the second arg can't be a group.
     * So the workaround is to iterate over the group and add individual colliders.
    */
    // this.scene.physics.add.collider(cannonball.sprite, targets.getHitboxes());
    targets.getHitboxes().forEach(group => {
      group.children.entries.forEach(zone => {
        levelScene.physics.add.collider(cannonball.sprite, zone);
      });
    });
    levelScene.physics.add.collider(cannonball.sprite, targets.getBullseyeHitboxes());
  }
}
