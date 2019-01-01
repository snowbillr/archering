export function flashOut(gameObjects, callback) {
  if (gameObjects.length === 0) { callback(); }

  const scene = gameObjects[0].scene;
  scene.tweens.add({
    targets: gameObjects,
    props: {
      alpha: 0,
    },
    duration: 200,
    yoyo: true,
    repeat: 1,
    onComplete: () => {
      scene.tweens.add({
        targets: gameObjects,
        props: {
          alpha: 0,
        },
        duration: 200,
        onComplete: () => {
          callback();
        },
      })
    },
  });
}
