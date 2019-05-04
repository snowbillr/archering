import * as STATES from '../level-states';
import { Arrow } from '../entities/arrow.js';
import { ArrowBalloonCollider } from '../colliders/arrow-balloon-collider';
import { SplitArrowTargetCollider } from '../colliders/split-arrow-target-collider';
import { SplitArrowGroundCollider } from '../colliders/split-arrow-ground-collider';

export class SplitArrowSkill {
  constructor(scene) {
    this.scene = scene;

    this.validStates = [STATES.FLY];
  }

  activate() {
    const levelScene = this.scene.scene.get('level');
    const arrow = levelScene.arrow;

    this.arrows = [
      this._createSplitArrow(levelScene, arrow, -20),
      this._createSplitArrow(levelScene, arrow, 20),
    ];
  }

  update() {
    this.arrows.forEach(arrow => arrow.update());
  }

  deactivate() {
    // no-op
  }

  _createSplitArrow(levelScene, originalArrow, angleDelta) {
    const ax = originalArrow.sprite.body.velocity.x;
    const ay = originalArrow.sprite.body.velocity.y;
    const originalArrowMagnitude = Math.sqrt(ax * ax + ay * ay);
    const splitArrowAngle = Phaser.Math.DegToRad(originalArrow.sprite.angle + angleDelta);

    const splitArrow = new Arrow(levelScene);
    splitArrow.sprite.x = originalArrow.sprite.x;
    splitArrow.sprite.y = originalArrow.sprite.y;
    splitArrow.sprite.angle = splitArrowAngle;
    splitArrow.sprite.body.allowGravity = true;
    splitArrow.hitbox.body.enable = true;
    this.scene.physics.velocityFromRotation(splitArrowAngle, originalArrowMagnitude, splitArrow.sprite.body.velocity)

    const arrowBalloonCollider = new ArrowBalloonCollider(levelScene);
    const splitArrowTargetCollider = new SplitArrowTargetCollider(levelScene);
    const splitArrowGroundCollider = new SplitArrowGroundCollider(levelScene, () => {});

    levelScene.physics.add.overlap(splitArrow.getHitbox(), levelScene.targets.getHitboxes(), splitArrowTargetCollider.onTargetHit);
    levelScene.physics.add.overlap(splitArrow.getHitbox(), levelScene.targets.getBullseyeHitboxes(), splitArrowTargetCollider.onBullseyeHit);
    levelScene.physics.add.overlap(splitArrow.getHitbox(), levelScene.balloons.getBalloonHitboxes(), arrowBalloonCollider.onBalloonHit)
    levelScene.physics.add.overlap(splitArrow.getHitbox(), levelScene.balloons.getStringHitboxes(), arrowBalloonCollider.onStringHit)
    levelScene.physics.add.collider(splitArrow.getHitbox(), levelScene.groundZone, splitArrowGroundCollider.onHit);

    return splitArrow;
  }
}
