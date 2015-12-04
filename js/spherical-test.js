var options = {
  speedOfLight: 200,
  thrust: 5,
  width: innerWidth,
  height: innerHeight,
  startingCount: 0,
  endCount: 150,
  expansionFactor: 1.01,
  additionDelay: 0,
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
  projection: 'Globe',//'Azimuthal Equidistant',
  shipCentered: true
};

window.onload = function () {
  var gui = new dat.GUI();
  gui.close();
  gui.add(options, 'speedOfLight', 0, 100);
  gui.add(options, 'thrust', 0, 5);
  gui.add(options, 'endCount', 0, 1000);
  gui.add(options, 'expansionFactor', 1, 1.5);
  gui.add(options, 'additionDelay', 0, 100);
  gui.add(options, 'expansionWait', 0, 10000);
  gui.add(options, 'expansionDelay', 0, 500);
  gui.add(options, 'maxExpansion', 0, 10);
  gui.add(options, 'cooldownFactor', 0, 1);
  gui.add(options, 'collisionForce', 0, 1);
  gui.add(options, 'useForceLayout');
  gui.add(options, 'useCollisions');
  gui.add(options, 'outlineParticles');
  gui.add(options, 'renderGraticules');
  gui.add(options, 'renderPlanet');
  gui.add(options, 'paused');
  gui.add(options, 'projection', ['Azimuthal Equidistant', 'Mercator', 'Mollweide', 'Globe']);
};

var canvasSelector = '#sphereUniverse';

var u = new SphericalUniverse(canvasSelector, options);

u.filledCallback = function(){
  setTimeout(u.expand, 5000);
}

//u.addOne();