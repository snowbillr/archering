import { config } from '../config';
import * as STATES from '../level-states';
import { Effects } from '../effects';
import { ArrowGroundCollider } from './arrow-ground-collider';

export class SplitArrowGroundCollider extends ArrowGroundCollider {
  constructor(scene) {
    super(scene);
  }

  onHit(arrowHitbox, ground) {
    arrowHitbox.hitboxParent.onHit();

    Effects.flashOut([arrowHitbox.hitboxParent.getSprite()]);
  }
}
