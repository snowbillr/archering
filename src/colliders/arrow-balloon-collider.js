import { config } from '../config';

export class ArrowBalloonCollider {
  constructor(scene) {
    this.scene = scene;

    this.onBalloonHit = this.onBalloonHit.bind(this);
    this.onStringHit = this.onStringHit.bind(this);
  }

  onBalloonHit(arrow, balloon) {
    this.scene.registry.set(config.registryKeys.level.remainingBalloons, this.scene.registry.get(config.registryKeys.level.remainingBalloons) - 1);
    this.scene.registry.set(config.registryKeys.level.poppedBalloons, this.scene.registry.get(config.registryKeys.level.poppedBalloons) + 1);

    this.scene.registry.set(config.registryKeys.level.gold, this.scene.registry.get(config.registryKeys.level.gold) + config.entities.level.balloon.gold);

    balloon.pop()
  }

  onStringHit(arrow, balloon) {
    this.scene.registry.set(config.registryKeys.level.remainingBalloons, this.scene.registry.get(config.registryKeys.level.remainingBalloons) - 1);

    balloon.cutString();
  }
}
