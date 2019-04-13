import { config } from '../config';
import * as STATES from '../level-states';
import { Effects } from '../effects';

export class ArrowTargetCollider {
  constructor(scene, sceneCallback) {
    this.scene = scene;
    this.sceneCallback = sceneCallback;

    this.onTargetHit = this.onTargetHit.bind(this);
    this.onBullseyeHit = this.onBullseyeHit.bind(this);
  }

  onTargetHit(arrowHitbox, targetHitbox, gold = config.entities.level.target.gold) {
    this.scene.registry.set(config.registryKeys.level.remainingArrows, this.scene.registry.get(config.registryKeys.level.remainingArrows) - 1);
    this.scene.registry.set(config.registryKeys.level.remainingTargets, this.scene.registry.get(config.registryKeys.level.remainingTargets) - 1);
    this.scene.registry.set(config.registryKeys.level.state, STATES.HIT);

    this.scene.registry.set(config.registryKeys.level.gold, this.scene.registry.get(config.registryKeys.level.gold) + gold);

    arrowHitbox.hitboxParent.onHit();
    targetHitbox.hitboxParent.onHit();

    Effects.flashOut([arrowHitbox.hitboxParent.getSprite(), targetHitbox.hitboxParent.getSprite()], () => {
      this.scene.registry.set(config.registryKeys.level.state, STATES.REST);

      this.sceneCallback.call(this.scene);
    });
  }

  onBullseyeHit(arrowHitbox, bullseyeHitbox) {
    const target = bullseyeHitbox.hitboxParent;

    Effects.notify(this.scene, target.sprite.x, target.sprite.y, 'Bullseye!');
    this.onTargetHit(arrowHitbox, bullseyeHitbox, config.entities.level.targetBullseye.gold);
  }
}
