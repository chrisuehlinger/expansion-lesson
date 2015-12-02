var emptyOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: innerWidth,
  canvasHeight: 400,
  width: 400,
  height: 400,
  maxWidth: 2 * innerWidth,
  maxHeight: 2 * innerHeight,
  startingCount: 0,
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
  shipCentered: false
};

var emptyUniverse = new RectangularUniverse('#emptyUniverse', emptyOptions);

var centeredOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: innerWidth,
  canvasHeight: 400,
  width: 400,
  height: 400,
  maxWidth: 2 * innerWidth,
  maxHeight: 2 * innerHeight,
  startingCount: 0,
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
  shipCentered: true
};

var centeredUniverse = new RectangularUniverse('#centeredUniverse', centeredOptions);

var expandingEmptyOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: innerWidth,
  canvasHeight: 400,
  width: 300,
  height: 300,
  maxWidth: innerWidth,
  maxHeight: 2 * innerHeight,
  startingCount: 0,
  endCount: 0,
  expansionFactor: 1.01,
  additionDelay: 0,
  expansionWait: 5000,
  expansionDelay: 0,
  cooldownFactor: 0.9,
  collisionForce: 0.1,
  useForceLayout: false,
  useCollisions: true,
  outlineParticles: false,
  shipCentered: true
};

var expandingEmptyUniverse = new RectangularUniverse('#expandingEmptyUniverse', expandingEmptyOptions);

setTimeout(expandingEmptyUniverse.expand, 5000);


var sparseOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: innerWidth,
  canvasHeight: 400,
  width: 400,
  height: 400,
  maxWidth: 2 * innerWidth,
  maxHeight: 2 * innerHeight,
  startingCount: 50,
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
  shipCentered: true
};

var sparseUniverse = new RectangularUniverse('#sparseUniverse', sparseOptions);

var filledOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: innerWidth,
  canvasHeight: 400,
  width: 300,
  height: 300,
  maxWidth: 2 * innerWidth,
  maxHeight: 2 * innerHeight,
  startingCount: 50,
  endCount: 300,
  expansionFactor: 1.01,
  additionDelay: 0,
  expansionWait: 5000,
  expansionDelay: 0,
  cooldownFactor: 0.9,
  collisionForce: 0.1,
  useForceLayout: false,
  useCollisions: true,
  outlineParticles: false,
  shipCentered: true
};

var filledUniverse = new RectangularUniverse('#filledUniverse', filledOptions);

filledUniverse.filledCallback = function(){
  setTimeout(filledUniverse.expand, 5000);
}

filledUniverse.addOne();

var bigBangOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: innerWidth,
  canvasHeight: 400,
  width: 2,
  height: 2,
  maxWidth: 2 * innerWidth,
  maxHeight: 2 * innerHeight,
  startingCount: 300,
  endCount: 300,
  expansionFactor: 1.1,
  additionDelay: 0,
  expansionWait: 5000,
  expansionDelay: 0,
  cooldownFactor: 0.9,
  collisionForce: 0.1,
  useForceLayout: false,
  useCollisions: true,
  outlineParticles: false,
  shipCentered: true
};

var bigBangUniverse = new RectangularUniverse('#bigBangUniverse', bigBangOptions);

bigBangUniverse.filledCallback = function(){
  setTimeout(bigBangUniverse.expand, 5000);
}

bigBangUniverse.addOne();

var globeOptions = {
  speedOfLight: 200,
  thrust: 5,
  width: innerWidth,
  height: 500,
  startingCount: 0,
  endCount: 100,
  expansionFactor: 1.01,
  additionDelay: 5,
  expansionWait: 5000,
  expansionDelay: 0,
  maxExpansion: 5,
  cooldownFactor: 0.9,
  collisionForce: 0.1,
  useForceLayout: false,
  useCollisions: true,
  outlineParticles: false,
  renderGraticules: true,
  renderPlanet: false,
  paused: false,
  projection: 'Globe'
};

var globeUniverse = new SphericalUniverse('#globeUniverse', globeOptions);

var flatCircleOptions = {
  speedOfLight: 200,
  thrust: 5,
  width: innerWidth,
  height: 500,
  startingCount: 0,
  endCount: 100,
  expansionFactor: 1.01,
  additionDelay: 5,
  expansionWait: 5000,
  expansionDelay: 0,
  maxExpansion: 5,
  cooldownFactor: 0.9,
  collisionForce: 0.1,
  useForceLayout: false,
  useCollisions: true,
  outlineParticles: false,
  renderGraticules: true,
  renderPlanet: false,
  paused: false,
  projection: 'Azimuthal Equidistant'
};

var flatCircleUniverse = new SphericalUniverse('#flatCircleUniverse', flatCircleOptions);

var expandingSphereOptions = {
  speedOfLight: 200,
  thrust: 5,
  width: innerWidth,
  height: 600,
  startingCount: 50,
  endCount: 100,
  expansionFactor: 1.01,
  additionDelay: 5,
  expansionWait: 5000,
  expansionDelay: 0,
  maxExpansion: 5,
  cooldownFactor: 0.9,
  collisionForce: 0.1,
  useForceLayout: false,
  useCollisions: true,
  outlineParticles: false,
  renderGraticules: false,
  renderPlanet: false,
  paused: false,
  projection: 'Azimuthal Equidistant'
};

var expandingSphereUniverse = new SphericalUniverse('#expandingSphereUniverse', expandingSphereOptions);

expandingSphereUniverse.filledCallback = function(){
  setTimeout(expandingSphereUniverse.expand, 5000);
};

expandingSphereUniverse.addOne();

var infiniteOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: innerWidth,
  canvasHeight: 400,
  width: innerWidth,
  height: 500,
  maxWidth: 5 * innerWidth,
  maxHeight: 5 * innerHeight,
  startingCount: 3000,
  endCount: 1000,
  expansionFactor: 1.02,
  additionDelay: 0,
  expansionWait: 5000,
  expansionDelay: 0,
  cooldownFactor: 0.9,
  collisionForce: 0.1,
  useForceLayout: false,
  useCollisions: true,
  outlineParticles: false,
  shipCentered: true
};

var infiniteUniverse = new RectangularUniverse('#infiniteUniverse', infiniteOptions);

infiniteUniverse.filledCallback = function(){
  setTimeout(infiniteUniverse.expand, 5000);
};

infiniteUniverse.addOne();