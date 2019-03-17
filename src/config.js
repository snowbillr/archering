const viewportWidth = 640;

export const config = {
  dimensions: {
    viewport: {
      width: viewportWidth,
      height: 300,
    },
    world: {
      width: 1500,
      height: 300,
    }
  },
  layouts: {
    game: {
      targets: { y: 230 },
      groundZone: {
        x: 0,
        y: 260,
        width: viewportWidth,
        height: 40,
      },
    }
  }
}
