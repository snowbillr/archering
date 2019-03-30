import { config } from '../config';

export function notify(scene, x, y, string) {
  const size = config.entities.level.notify.size;

  const text = scene.add.bitmapText(x, y, 'font', string, size);
  text.setOrigin(0.5, 1);

  text.y -= size;
  text.alpha = 0;

  const tweens = [
    {
      targets: [text],
      props: {
        alpha: 1,
        y: `-=${size}`,
      },
      duration: 600,
    },
    /*
    {
      targets: [text],
      props: {
        y: `-=${size / 2}`,
      },
      duration: 300,
    },
    */
    {
      targets: [text],
      props: {
        alpha: 0,
        y: `-=${size}`,
      },
      duration: 600,
      delay: 300,
    },
  ];

  scene.tweens.timeline({ tweens });
}
