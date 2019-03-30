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
    level: {
      arrow: {
        x: 50,
        y: 240,
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
        height: viewportHeight - 60,
        leftX: 0,
        rightX: 540,
        y: 60,
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
    },
    ui: {
      quiverLabel: {
        x: 30,
        y: 15,
        size: 24,
      },
      arrows: {
        x: 120,
        xStep: 20,
        y: 22,
        rotation: -45,
      },
      chargeLabel: {
        x: 30,
        y: 44,
        size: 24,
      },
      chargeGauge: {
        x: 110,
        y: 40,
      },
      restartButton: {
        x: 600,
        y: 15,
      }
    }
  },
  entities: {
    level: {
      arrow: {
        minCharge: 200,
        maxCharge: 700,
      },
      notify: {
        size: 20,
      }
    }
  }
}
