import { config } from '../config';
import { SpectralArrowIcon } from '../ui/spectral-arrow-icon';
import { SplitArrowIcon } from '../ui/split-arrow-icon';
import { CannonballIcon } from '../ui/cannonball-icon';

export class SkillStoreScene extends Phaser.Scene {
  constructor() {
    super({ key: 'skill-store' });
  }

  create() {
    this._createBackgroundImage('store-bg-0');
    this._createBackgroundImage('store-bg-1');
    this._createBackgroundImage('store-bg-2');
    this._createBackgroundImage('store-bg-3');

    this.add.bitmapText(500, 40, 'font', 'Level Select', 24)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerdown', () => {
        this.scene.start('level-select');
      });

    this.add.bitmapText(320, 50, 'font-outline', 'Skill Store', 12)
      .setOrigin(0.5);

    this._createSpectralArrowButton();
    this._createSplitArrowButton();
    this._createCannonballButton();

    this._createDescriptionBackground();
    this._createDescriptionTexts();
  }

  _createBackgroundImage(key) {
    this.add.image(0, 0, key)
      .setDisplaySize(config.dimensions.viewport.width, config.dimensions.viewport.height)
      .setOrigin(0);
  }

  _createSpectralArrowButton() {
    this._createSkillButton(130, 120, SpectralArrowIcon, 'spectralArrow', 25, config.registryKeys.skills.spectralArrow);
  }

  _createSplitArrowButton() {
    this._createSkillButton(310, 120, SplitArrowIcon, 'splitArrow', 25, config.registryKeys.skills.splitArrow);
  }

  _createCannonballButton() {
    this._createSkillButton(490, 120, CannonballIcon, 'cannonball', 25, config.registryKeys.skills.cannonball);
  }

  _createSkillButton(x, y, iconClass, descriptionKey, cost, registryKey) {
    this.add.image(x, y, 'skill-background')
      .setDisplaySize(42, 42)
      .setInteractive({ cursor: 'pointer' })
      .on('pointerover', () => this._displayDescriptionFor(descriptionKey))
      .on('pointerout', () => this._hideDescription());
    new iconClass(this, x, y);

    const costText = this.add.bitmapText(x - 5, y + 40, 'font', cost, 18)
      .setOrigin(0.5);
     this.add.image(x + costText.width - 5, y + 40, 'gold-3');

    const chargeCount = this.registry.get(registryKey).chargeCount;
    this.add.bitmapText(x, y + 65, 'font', `Charges: ${chargeCount}`, 18)
      .setOrigin(0.5);
  }

  _createDescriptionBackground() {
    this.descriptionBackground = this.add.graphics();
    this.descriptionBackground.fillStyle(0x222222, 0.7);
    this.descriptionBackground.fillRect(50, 200, 540, 80);
    this.descriptionBackground.alpha = 0;
  }

  _createDescriptionTexts() {
    const skillDescriptions = {
      'spectralArrow': 'Your arrow becomes spectral and can pass through targets.',
      'cannonball': "Drop a cannonball from your arrow as it flies. Don't ask how.",
      'splitArrow': 'Your single arrow splits into 3 new arrows.',
    };

    const spectralArrowText = this.add.bitmapText(320, 240, 'font', skillDescriptions['spectralArrow'], 18)
      .setOrigin(0.5)
      .setAlpha(0);
    const splitArrowText = this.add.bitmapText(320, 240, 'font', skillDescriptions['splitArrow'], 18)
      .setOrigin(0.5)
      .setAlpha(0);
    const cannonballText = this.add.bitmapText(320, 240, 'font', skillDescriptions['cannonball'], 18)
      .setOrigin(0.5)
      .setAlpha(0);

    this.skillTexts = {
      'spectralArrow': spectralArrowText,
      'splitArrow': splitArrowText,
      'cannonball': cannonballText,
    }
  }

  _displayDescriptionFor(skill) {
    this.descriptionBackground.alpha = 1;
    this.skillTexts[skill].alpha = 1;
  }

  _hideDescription() {
    this.descriptionBackground.alpha = 0;
    Object.values(this.skillTexts).forEach(text => text.alpha = 0);
  }
}
