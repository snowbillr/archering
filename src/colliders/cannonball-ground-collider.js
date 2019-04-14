import { Effects } from '../effects';

export class CannonballGroundCollider {
  constructor() {}

  onHit(cannonball, ground) {
    cannonball.body.enable = false;

    Effects.flashOut([cannonball]);
  }
}
