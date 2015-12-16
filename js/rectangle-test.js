var options = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: innerWidth,
  canvasHeight: innerHeight,
  width: innerWidth / 2,
  height: innerHeight / 2,
  maxWidth: 2 * innerWidth,
  maxHeight: 2 * innerHeight,
  startingCount: 10,
  endCount: 300,
  expansionFactor: 1.01,
  additionDelay: 50,
  expansionWait: 5000,
  expansionDelay: 0,
  cooldownFactor: 0.9,
  collisionForce: 0.1,
  useForceLayout: false,
  useCollisions: true,
  outlineParticles: true,
  shipCentered: true,
  asteroids: [{
    x: innerWidth / 8,
    y: innerHeight / 4,
    vx: 0,
    vy: 0,
    direction: 0
  }, {
      x: innerWidth/ 3,
      y: innerHeight / 3,
      vx: 0,
      vy: 0,
      direction: 0
    }]
};

window.onload = function () {
  var gui = new dat.GUI();
  gui.add(options, 'speedOfLight', 0, 50);
  gui.add(options, 'thrust', 0, 5);
  gui.add(options, 'width', 0, 500);
  gui.add(options, 'height', 0, 500);
  gui.add(options, 'endCount', 0, 1000);
  gui.add(options, 'expansionFactor', 1, 1.5);
  gui.add(options, 'additionDelay', 0, 100);
  gui.add(options, 'expansionWait', 0, 10000);
  gui.add(options, 'expansionDelay', 0, 500);
  gui.add(options, 'cooldownFactor', 0, 1);
  gui.add(options, 'collisionForce', 0, 1);
  gui.add(options, 'useCollisions');
  gui.add(options, 'outlineParticles');
  gui.add(options, 'shipCentered');
};

var canvasSelector = '#rectUniverse';

var u = new RectangularUniverse(canvasSelector, options);

u.filledCallback = function () {
  u.expand();
}

u.addOne();

u.init();