import { config } from '../config';

export class RestartLevelButton {
  constructor(scene) {
    this.scene = scene;

    this.button = this.scene.add.bitmapText(
      config.layouts.ui.restartButton.x,
      config.layouts.ui.restartButton.y,
      'font',
      'R',
      28,
      ).setInteractive({ cursor: 'pointer' })
      .on('pointerdown', this._triggerLevelRestart, this);
  }

  _triggerLevelRestart() {
    this.scene.scene.get('level').restartLevel();
  }
}
