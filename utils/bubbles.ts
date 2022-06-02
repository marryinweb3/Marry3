export const loveBubbles = (dom: HTMLElement) => {
  //@ts-ignore
  const mojs = window.mojs as any;
  class Heart extends mojs.CustomShape {
    getShape() {
      return '<path d="M92.5939814,7.35914503 C82.6692916,-2.45304834 66.6322927,-2.45304834 56.7076029,7.35914503 L52.3452392,11.6965095 C51.0327802,12.9714696 48.9328458,12.9839693 47.6203869,11.6715103 L47.6203869,11.6715103 L43.2705228,7.35914503 C33.3833318,-2.45304834 17.3213337,-2.45304834 7.43414268,7.35914503 C-2.47804756,17.1963376 -2.47804756,33.12084 7.43414268,42.9205337 L29.7959439,65.11984 C29.7959439,65.1323396 29.8084435,65.1323396 29.8084435,65.1448392 L43.2580232,78.4819224 C46.9704072,82.1818068 52.9952189,82.1818068 56.7076029,78.4819224 L70.1696822,65.1448392 C70.1696822,65.1448392 70.1696822,65.1323396 70.1821818,65.1323396 L92.5939814,42.9205337 C102.468673,33.12084 102.468673,17.1963376 92.5939814,7.35914503 L92.5939814,7.35914503 Z"></path>';
    }
    getLength() {
      return 292.110107421875;
    } // optional
  }

  mojs.addShape("heart", Heart);

  // const SWIRL_OPTS = {
  //   left: 0,
  //   top: 0,
  //   fill: "#f41870",
  //   duration: "rand(1300, 1700)",
  //   radius: "rand(10, 20)",
  //   pathScale: "rand(.5, 1)",
  //   swirlFrequency: "rand(2,5)",
  //   swirlSize: "rand(8,30)",
  //   shape: "heart",
  //   direction: "rand(-1,1)",
  // };
  // const swirls = [];
  // for (let i = 0; i < 3; i++) {
  //   swirls.push(
  //     new mojs.ShapeSwirl({
  //       ...SWIRL_OPTS,
  //     })
  //   );
  // }

  const CIRCLE_OPTS = {
    parent: dom,
    fill: "#F41870",
    fillOpacity: 0.3,
    radius: 175,
    shape: "circle",
    x: { "rand(-30, 30)": "rand(-30, 30)" },
    y: { "rand(-30, 30)": "rand(-30, 30)" },
    origin: "50% 50%",
    left: "50%",
    top: "50%",
    repeat: 10000,
    duration: "rand(3000,5000)",
    // backwardEasing: "sin.in",
    isYoyo: true,
    // isShowEnd: false,
    isShowStart: true,
  };
  for (let i = 0; i < 8; i++) {
    const circle = new mojs.Shape(CIRCLE_OPTS);
    circle.generate().play();
  }

  const S_CIRCLE_OPTS = {
    parent: dom,
    fill: "#f41870",
    fillOpacity: 1,
    radius: "rand(2, 8)",
    shape: "circle",
    x: { "rand(-600, 600)": "rand(-100, 100)" },
    y: { "rand(-300, 300)": "rand(-100, 100)" },

    origin: "50% 50%",
    left: "50%",
    top: "50%",
    repeat: 10000,
    duration: "rand(10000,20000)",
    // backwardEasing: "sin.in",
    isYoyo: false,
    isShowEnd: false,
    isShowStart: true,
  };
  for (let i = 0; i < 30; i++) {
    const circle = new mojs.Shape(S_CIRCLE_OPTS);
    circle.generate().play();
  }
  setTimeout(() => {
    for (let i = 0; i < 30; i++) {
      const circle = new mojs.Shape(S_CIRCLE_OPTS);
      circle.generate().play();
    }
  }, 5000);

  const mousePos = {
    x: 0,
    y: 0,
  };
  document.addEventListener("mousemove", function (e) {
    mousePos.x = e.pageX;
    mousePos.y = e.pageY;
  });
};
