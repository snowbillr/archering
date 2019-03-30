export function notify(scene, x, y, string) {
  const text = scene.add.bitmapText(x, y, 'font', string, 20);
  text.setOrigin(0.5, 1);

  text.y -= text.height;
  text.alpha = 0;

  const tweens = [
    {
      targets: [text],
      props: {
        alpha: 1,
        y: `-=${text.height}`,
      },
      duration: 600,
    },
    /*
    {
      targets: [text],
      props: {
        y: `-=${text.height / 2}`,
      },
      duration: 300,
    },
    */
    {
      targets: [text],
      props: {
        alpha: 0,
        y: `-=${text.height}`,
      },
      duration: 600,
      delay: 300,
    },
  ];

  scene.tweens.timeline({ tweens });
}
