import * as STATES from '../game-states';

export class ScrollZone {
  constructor(scene, scrollingDirection) {
    this.scene = scene;
    this.scrollingDirection = scrollingDirection;

    if (scrollingDirection === -1) { // left
      this.zone = scene.add.zone(0, 0)
        .setSize(100, 300)
        .setInteractive({ cursor: 'w-resize' });
    } else { // right
      this.zone = scene.add.zone(540, 0)
        .setSize(100, 300)
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
