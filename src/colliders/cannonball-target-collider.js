import { Effects } from '../effects';
import { config } from '../config';

export class CannonballTargetCollider {
  constructor(scene) {
    this.scene = scene;

    this.onTargetHit = this.onTargetHit.bind(this);
  }

  onTargetHit(cannonballHitbox, targetHitbox) {
    const gold = config.entities.level.target.gold;

    this.scene.registry.set(config.registryKeys.level.remainingTargets, this.scene.registry.get(config.registryKeys.level.remainingTargets) - 1);
    this.scene.registry.set(config.registryKeys.level.gold, this.scene.registry.get(config.registryKeys.level.gold) + gold);

    cannonballHitbox.hitboxParent.onHit();
    targetHitbox.hitboxParent.onHit();

    Effects.flashOut([targetHitbox.hitboxParent.getSprite(), cannonballHitbox.hitboxParent.sprite]);
  }

  onBullseyeHit(cannonball, bullseyeHitbox) {
  }
}
