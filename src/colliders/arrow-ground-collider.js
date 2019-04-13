import { config } from '../config';
import * as STATES from '../level-states';
import { Effects } from '../effects';

export class ArrowGroundCollider {
  constructor(scene, sceneCallback) {
    this.scene = scene;
    this.sceneCallback = sceneCallback;

    this.onHit = this.onHit.bind(this);
  }

  onHit(arrowHitbox, ground) {
    this.scene.registry.set(config.registryKeys.level.remainingArrows, this.scene.registry.get(config.registryKeys.level.remainingArrows) - 1);
    this.scene.registry.set(config.registryKeys.level.state, STATES.HIT);

    arrowHitbox.hitboxParent.onHit();

    Effects.flashOut([arrowHitbox.hitboxParent.getSprite()], () => {
      this.scene.registry.set(config.registryKeys.level.state, STATES.REST);

      this.sceneCallback.call(this.scene);
    });
  }
}
