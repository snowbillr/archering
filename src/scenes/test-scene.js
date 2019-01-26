import { Balloon } from '../entities/balloon';

export class TestScene extends Phaser.Scene {
  constructor() {
    super({ key: 'test' });
  }

  preload() {
    this.load.image('balloon-1', 'assets/balloon/1.png');
    this.load.image('balloon-2', 'assets/balloon/2.png');
    this.load.image('balloon-3', 'assets/balloon/3.png');
    this.load.image('balloon-4', 'assets/balloon/4.png');
    this.load.image('balloon-5', 'assets/balloon/5.png');
    this.load.image('balloon-6', 'assets/balloon/6.png');
    this.load.image('balloon-string', 'assets/balloon/string.png');
  }

  create() {
    this.anims.create({
      key: 'balloon-pop',
      frames: [
        { key: 'balloon-1' },
        { key: 'balloon-2' },
        { key: 'balloon-3' },
        { key: 'balloon-4' },
        { key: 'balloon-5' },
        { key: 'balloon-6' },
      ],
    });

    const balloon = new Balloon(this, 100, 100);
    balloon.x = 100;
    balloon.y = 100;
  }
}
