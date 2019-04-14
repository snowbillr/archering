import { Effects } from '../effects';

export class CannonballGroundCollider {
  constructor() {}

  onHit(cannonballHitbox, ground) {
    const cannonball = cannonballHitbox.hitboxParent;

    cannonball.onHit();
    Effects.flashOut([cannonball.sprite]);
  }
}
