import { config } from '../config';
import { Cannonball } from '../entities/cannonball';
import { CannonballGroundCollider } from '../colliders/cannonball-ground-collider';
import { CannonballTargetCollider } from '../colliders/cannonball-target-collider';
import { CannonballBalloonCollider } from '../colliders/cannonball-balloon-collider';

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
    levelScene.physics.add.collider(cannonball.hitbox, ground, cannonballGroundCollider.onHit);

    const cannonballBalloonCollider = new CannonballBalloonCollider(levelScene);
    levelScene.physics.add.collider(cannonball.hitbox, balloons.getBalloonHitboxes(), cannonballBalloonCollider.onBalloonHit);

    /*
     * This looks like a bug with 3.16.2.
     * It seems that if the first arg's body is a circle, the second arg can't be a group.
     * So the workaround is to iterate over the group and add individual colliders.
    */
    // this.scene.physics.add.collider(cannonball.sprite, targets.getHitboxes());
    const cannonballTargetCollider = new CannonballTargetCollider(levelScene);
    targets.getHitboxes().forEach(group => {
      group.children.entries.forEach(zone => {
        // hacky until i implement circles in the hitbox lib
        levelScene.physics.add.collider(cannonball.hitbox, zone, cannonballTargetCollider.onTargetHit.bind(cannonballTargetCollider, cannonball, zone));
      });
    });
    // TODO - add on hit handler for bullseyes
    // levelScene.physics.add.collider(cannonball.sprite, targets.getBullseyeHitboxes());
  }
}
