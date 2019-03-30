import * as STATES from '../level-states';
import { config } from '../config';

const scrollZonesConfig = config.layouts.game.scrollZones;

export class ScrollZone {
  constructor(scene, scrollingDirection) {
    this.scene = scene;
    this.scrollingDirection = scrollingDirection;

    if (scrollingDirection === -1) { // left
      this.zone = scene.add.zone(scrollZonesConfig.leftX, scrollZonesConfig.y)
        .setSize(scrollZonesConfig.width, scrollZonesConfig.height)
        .setInteractive({ cursor: 'w-resize' });
    } else { // right
      this.zone = scene.add.zone(scrollZonesConfig.rightX, scrollZonesConfig.y)
        .setSize(scrollZonesConfig.width, scrollZonesConfig.height)
        .setInteractive({ cursor: 'e-resize' });
    }

    this.zone.on('pointerover', () => this._updateScrollingDirection(scrollingDirection));
    this.zone.on('pointerout', () => this._updateScrollingDirection(0));
  }

  updatePosition(x) {
    this.zone.x = x;
  }

  _updateScrollingDirection(scrollingDirection) {
    const state = this.scene.registry.get('state');

    if (state === STATES.REST) {
      this.scene.registry.set('scrollingDirection', scrollingDirection);
    }
  }
}
