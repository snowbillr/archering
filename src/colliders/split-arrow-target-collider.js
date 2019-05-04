import { config } from '../config';
import * as STATES from '../level-states';
import { Effects } from '../effects';
import { ArrowTargetCollider } from './arrow-target-collider';

export class SplitArrowTargetCollider extends ArrowTargetCollider {
  constructor(scene) {
    super(scene, () => {})
  }

  onTargetHit(arrowHitbox, targetHitbox, gold = config.entities.level.target.gold) {
    this.scene.registry.set(config.registryKeys.level.remainingTargets, this.scene.registry.get(config.registryKeys.level.remainingTargets) - 1);
    this.scene.registry.set(config.registryKeys.level.gold, this.scene.registry.get(config.registryKeys.level.gold) + gold);

    targetHitbox.hitboxParent.onHit();

    if (this.scene.skillManager.isActive(config.registryKeys.skills.spectralArrow)) {
      Effects.flashOut([targetHitbox.hitboxParent.getSprite()]);
    } else {
      arrowHitbox.hitboxParent.onHit();
      Effects.flashOut([arrowHitbox.hitboxParent.getSprite(), targetHitbox.hitboxParent.getSprite()]);
    }
  }

  onBullseyeHit(arrowHitbox, bullseyeHitbox) {
    const target = bullseyeHitbox.hitboxParent;

    Effects.notify(this.scene, target.sprite.x, target.sprite.y, 'Bullseye!');
    this.onTargetHit(arrowHitbox, bullseyeHitbox, config.entities.level.targetBullseye.gold);
  }
}
