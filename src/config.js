const viewportWidth = 640;
const viewportHeight = 300;

export const config = {
  dimensions: {
    viewport: {
      width: viewportWidth,
      height: viewportHeight,
    },
    world: {
      width: 1500,
      height: viewportHeight,
    }
  },
  layouts: {
    game: {
      arrow: {
        x: 50,
        y: 240,
        minCharge: 200,
        maxCharge: 700,
      },
      targets: { y: 230 },
      balloons: {
        string: {
          bottomY: 260,
          width: 5,
        }
      },
      groundZone: {
        x: 0,
        y: 260,
        width: viewportWidth,
        height: 40,
      },
      scrollZones: {
        width: 100,
        height: viewportHeight,
        leftX: 0,
        rightX: 540,
        y: 0,
      }
    },
    results: {
      title: {
        x: 320,
        y: 40,
        size: 32,
      },
      levelSelectButton: {
        x: 320,
        y: 260,
      },
      scores: {
        y: 80,
        yStep: 30,
        labelX: 250,
        valueX: 350,
        size: 24,
      },
      stars: {
        yTopMargin: 18,
        x: 275,
        xStep: 40,
        width: 36,
        height: 36,
      }
    }
  }
}
