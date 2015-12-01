/** Extend Number object with method to convert numeric degrees to radians */
if (Number.prototype.toRadians === undefined) {
  Number.prototype.toRadians = function () {
    return this * Math.PI / 180;
  };
}


/** Extend Number object with method to convert radians to numeric (signed) degrees */
if (Number.prototype.toDegrees === undefined) {
  Number.prototype.toDegrees = function () {
    return this * 180 / Math.PI;
  };
}

var constants = {
  speedOfLight: 200,
  thrust: 5,
  width: innerWidth,
  height: innerHeight,
  startingCount: 100,
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

window.onload = function () {
  var gui = new dat.GUI();
  gui.close();
  gui.add(constants, 'speedOfLight', 0, 100);
  gui.add(constants, 'thrust', 0, 5);
  gui.add(constants, 'endCount', 0, 1000);
  gui.add(constants, 'expansionFactor', 1, 1.5);
  gui.add(constants, 'additionDelay', 0, 100);
  gui.add(constants, 'expansionWait', 0, 10000);
  gui.add(constants, 'expansionDelay', 0, 500);
  gui.add(constants, 'maxExpansion', 0, 10);
  gui.add(constants, 'cooldownFactor', 0, 1);
  gui.add(constants, 'collisionForce', 0, 1);
  gui.add(constants, 'useForceLayout');
  gui.add(constants, 'useCollisions');
  gui.add(constants, 'outlineParticles');
  gui.add(constants, 'renderGraticules');
  gui.add(constants, 'renderPlanet');
  gui.add(constants, 'paused');
  gui.add(constants, 'projection', ['Azimuthal Equidistant', 'Mercator', 'Mollweide', 'Globe']);
};

var randomLat = d3.random.normal(0, 40)

function createNode() {
  return {
    collisions: 0,
    radius: Math.random() * 10 + 15,
    x: Math.random() * 360 - 180,
    y: randomLat(),
    direction: Math.random() * 2 * Math.PI,
    totalSpeed: 100 + 100 * Math.random()
  };
}

var ship = {
  x: 90,
  y: 0,
  radius: 10,
  direction: Math.PI / 2,
  totalSpeed: 50
};


var currentExpansion = 1;
var opacity = 0.99;
var temperature = d3.scale
  .linear()
  .domain([0, 10, 20, 30])
  .range(['black', 'red', 'orange', 'white']);

var nodes = d3.range(constants.startingCount).map(createNode),
  root = nodes[0];

var force = d3.layout.force();

constants.useForceLayout && force
  .gravity(0)
  .charge(function (d, i) {
    return i ? 0 : -0;
  })
  .nodes(nodes)
  .size([360, 180])
  .start();

! function addOne() {
  nodes.push(createNode());

  constants.useForceLayout && force.nodes(nodes).start();

  if (nodes.length < constants.endCount)
    setTimeout(addOne, constants.additionDelay);
  else
    setTimeout(bigger, constants.expansionWait);
}()

function bigger() {
  currentExpansion *= constants.expansionFactor;
  nodes.forEach(function (node) {
    node.radius *= 1 / constants.expansionFactor;
  });

//  projection.scale(currentProjectionScale * currentExpansion);

  if (currentExpansion < constants.maxExpansion)
    setTimeout(bigger, constants.expansionDelay);
}

var projection, currentProjectionScale;
currentProjectionScale = 75;
projection = d3.geo.azimuthalEquidistant()
  .scale(currentProjectionScale)
  .clipAngle(180 - 1e-3)
  .translate([constants.width / 2, constants.height / 2])
  .precision(.1);

var canvas = d3.select("body").append("canvas")
  .attr("width", constants.width)
  .attr("height", constants.height);

var c = canvas.node().getContext("2d");

var path = d3.geo.path()
  .projection(projection)
  .context(c);

var title = d3.select("h1");



$(window).on('keypress', function (e) {
  //console.log(e.which);
  if (e.which === 119) {
    ship.totalSpeed *= 1.1;
    if (ship.totalSpeed > constants.speedOfLight) {
      ship.totalSpeed = constants.speedOfLight;
    }
  }
  if (e.which === 115) {
    ship.totalSpeed *= 0.9;
    if (ship.totalSpeed > constants.speedOfLight) {
      ship.totalSpeed = constants.speedOfLight;
    }
  }
  if (e.which === 97) {
    ship.direction -= 1 * constants.thrust * Math.PI / 180;
  }
  if (e.which === 100) {
    ship.direction += 1 * constants.thrust * Math.PI / 180;
  }
});

function wrapAround(node) {
  if (node.x < -180) {
    node.x += 360;
  }

  if (node.x > 180) {
    node.x -= 360;
  }

  if (node.y < -90) {
    node.y = -90 - (node.y + 90);
    node.x = (node.x + 180) % 360;
    node.direction = ((node.direction.toDegrees() + 180) % 360).toRadians();
  }

  if (node.y > 90) {
    node.y = 90 - (node.y - 90);
    node.x = (node.x + 180) % 360;
    node.direction = ((node.direction.toDegrees() + 180) % 360).toRadians();
  }
}

//queue()
//  .defer(d3.json, "data/world-110m.json")
//  .defer(d3.tsv, "data/world-country-names.tsv")
//  .await(ready);

var globe, land, countries, borders;

function ready(error, world, names) {
  if (error) throw error;

  globe = {
    type: "Sphere"
  };
  land = topojson.feature(world, world.objects.land);
  countries = topojson.feature(world, world.objects.countries).features;
  borders = topojson.mesh(world, world.objects.countries, function (a, b) {
    return a !== b;
  });

  countries = countries.filter(function (d) {
    return names.some(function (n) {
      if (d.id == n.id) return d.name = n.name;
    });
  }).sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });
}

constants.useForceLayout ? force.on("tick", tick) : d3.timer(tick);

function tick() {
  if (constants.paused)
    return;

  nodes.forEach(function (node) {
    node.collisions = Math.min(node.collisions, 400);
    node.collisions *= constants.cooldownFactor;
  });
  var q = d3.geom.quadtree(nodes, -180, -90, 180, 90),
    i,
    d,
    n = nodes.length;

  if (constants.useCollisions)
    for (i = 0; i < n; ++i) q.visit(collide(nodes[i]));


  //    q.visit(collide(ship));

  if (ship.totalSpeed > constants.speedOfLight) {
    ship.totalSpeed = constants.speedOfLight;
  }

  var lon = ship.x * Math.PI / 180;
  var lat = ship.y * Math.PI / 180;
  var R = 180 / Math.PI;
  var d = ship.totalSpeed * (1 / currentExpansion) * Math.PI / 180;
  var brng = ship.direction;

  var φ2 = Math.asin(Math.sin(lat) * Math.cos(d / R) +
    Math.cos(lat) * Math.sin(d / R) * Math.cos(brng));
  var λ2 = lon + Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(lat),
    Math.cos(d / R) - Math.sin(lat) * Math.sin(φ2));

  var bearingDegrees = Math.atan2(Math.sin(lon - λ2) * Math.cos(lat),
    Math.cos(φ2) * Math.sin(lat) - Math.sin(φ2) * Math.cos(lat) * Math.cos(lon - λ2)
  ) * 180 / Math.PI;

  ship.direction = ((bearingDegrees + 180) % 360) * Math.PI / 180;
  ship.x = λ2 * 180 / Math.PI;
  ship.y = φ2 * 180 / Math.PI;

  wrapAround(ship);


  nodes.forEach(function (node) {
//    console.log(node.direction);
    if (node.totalSpeed > constants.speedOfLight) {
      node.totalSpeed = constants.speedOfLight;
    }

    var lon = node.x * Math.PI / 180;
    var lat = node.y * Math.PI / 180;
    var R = 180 / Math.PI;
    var d = node.totalSpeed * (1 / currentExpansion) * Math.PI / 180;
    var brng = node.direction;

    var φ2 = Math.asin(Math.sin(lat) * Math.cos(d / R) +
      Math.cos(lat) * Math.sin(d / R) * Math.cos(brng));
    var λ2 = lon + Math.atan2(Math.sin(brng) * Math.sin(d / R) * Math.cos(lat),
      Math.cos(d / R) - Math.sin(lat) * Math.sin(φ2));

    var bearingDegrees = Math.atan2(Math.sin(lon - λ2) * Math.cos(lat),
      Math.cos(φ2) * Math.sin(lat) - Math.sin(φ2) * Math.cos(lat) * Math.cos(lon - λ2)
    ) * 180 / Math.PI;

    node.direction = ((bearingDegrees + 180) % 360) * Math.PI / 180;
    node.x = λ2 * 180 / Math.PI;
    node.y = φ2 * 180 / Math.PI;
    node.sineLat = Math.sin(φ2);
  });

  nodes.forEach(wrapAround);
  render();
}

//d3.timer(render);

function render() {
  if (constants.paused)
    return;
  //    console.log(ship.direction * 180 / Math.PI);

  switch (constants.projection) {
  case 'Mollweide':
    currentProjectionScale = 100;
    projection = d3.geo.mollweide()
      .scale(currentProjectionScale * currentExpansion) // we'll scale up to match viewport shortly.
      .translate([constants.width / 2, constants.height / 2]);
    break;
  case 'Mercator':
    currentProjectionScale = 150;
    projection = d3.geo.mercator()
      .rotate([0,0])
      .scale(currentProjectionScale) // we'll scale up to match viewport shortly.
      .translate([constants.width / 2, constants.height / 2]);
    break;
  case 'Globe':
    currentProjectionScale = 240;
    projection = d3.geo.orthographic()
      .translate([constants.width / 2, constants.height / 2])
      .scale(currentProjectionScale * currentExpansion)
      .clipAngle(90);
      break;

  case 'Azimuthal Equidistant':
    currentProjectionScale = 75;
    projection = d3.geo.azimuthalEquidistant()
      .scale(currentProjectionScale * currentExpansion)
      .clipAngle(180 - 1e-3)
      .translate([constants.width / 2, constants.height / 2])
      .precision(.1);
  }


  c.save();
  c.clearRect(0, 0, constants.width, constants.height);
  if(constants.projection ==='Azimuthal Equidistant' || constants.projection === 'Globe'){
    c.translate(constants.width / 2, constants.height / 2);
    c.rotate(-ship.direction);
    c.translate(-constants.width / 2, -constants.height / 2);
  }

  constants.projection !== 'Mercator' && projection.rotate([-ship.x, -ship.y]);

  path.projection(projection);
  var circle = d3.geo.circle();
  //  c.save();
  //    c.globalAlpha = 0.5;
  for (var j = nodes.length - 1; j >= 0; --j) {
    var d = nodes[j];
    if(d.collisions > 1){
      circle.origin([d.x, d.y]);
      circle.angle(d.radius);

      c.beginPath();
      path(circle());

      c.fillStyle = temperature(d.collisions);
      c.fill();
      c.strokeStyle = 'white';
      constants.outlineParticles && c.stroke();
    }
  }
  //  c.restore();


  if (constants.renderPlanet && countries) {
    c.fillStyle = "#bbb", c.beginPath(), path(land), c.fill();
    c.strokeStyle = "#fff", c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
    c.strokeStyle = "#000", c.lineWidth = 2, c.beginPath(), path(globe), c.stroke();
  }

  if (constants.renderGraticules) {
    // Latitudes
    c.strokeStyle = '#fff';
    circle.origin([0, -90]);
    for (j = 10; j <= 170; j += 20) {
      circle.angle(j);
      c.beginPath();
      path(circle());
      c.stroke();
    }

    //Longtitudes
    circle.angle(90);
    for (j = 0; j <= 180; j += 15) {
      c.strokeStyle = j === 90 ? '#0f0' : '#fff';
      circle.origin([j, 0]);
      c.beginPath();
      path(circle());
      c.stroke();
    }
  }

  circle.origin([ship.x, ship.y]);
  circle.angle(3);
  c.strokeStyle = 'blue';
  c.fillStyle = 'blue';
  c.beginPath();
  path(circle());
  c.stroke();
  c.fill();
  c.restore();
}

function collide(node) {
  var r = node.radius + 16,
    nx1 = ((node.x + 180 - r) % 360) - 180,
    nx2 = ((node.x + 180 + r) % 360) - 180,
    ny1 = node.y - r,
    ny2 = node.y + r;
  return function (quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var lat1 = (node.y),
        lat2 = (quad.point.y),
        lon1 = (node.x),
        lon2 = (quad.point.x);
      var R = 180 / Math.PI;
      var λ1 = lon1.toRadians();
      var λ2 = lon2.toRadians();
      var φ1 = lat1.toRadians();
      var φ2 = lat2.toRadians();
      var Δφ = φ2 - φ1;
      var Δλ = λ2 - λ1;
      //      var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      //        Math.cos(φ1) * Math.cos(φ2) *
      //        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      //      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      //      var d = c;
      var d = Math.acos(Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δλ));
      //      var d = Math.acos(node.sineLat * quad.point.sineLat + node.cosLat * quad.point.cosLat * Math.cos(Δλ));
      //      var d = d3.geo.distance([lon1,lat1], [lon2,lat2]);
      var l = d.toDegrees() * 2,
        r = node.radius + quad.point.radius;

      if (l < r) {
        //        console.log(Math.floor(l), r);
        //        l = (l - r) / l * constants.collisionForce;


        //                node.x += Δλ.toDegrees() * l;
        //                node.y += Δφ.toDegrees() * l;
        node.collisions++;
        //                quad.point.x -= Δλ.toDegrees() * l;
        //                quad.point.y -= Δφ.toDegrees() * l;
        quad.point.collisions++;
        //                        var momentum = node.totalSpeed*node.radius + quad.point.totalSpeed*quad.point.radius;
        //                        node.totalSpeed = momentum * node.radius / (node.radius + quad.point.radius);
        //                        node.direction = Math.random() * 2 * Math.PI;//((bearingInitial(φ1, λ1, φ2, λ2) + 180) % 360).toRadians();
        //                        quad.point.totalSpeed = momentum * quad.point.radius / (node.radius + quad.point.radius);
        //                        quad.point.direction = ((bearingFinal(φ1, λ1, φ2, λ2) + 0) % 360).toRadians();
        //        quad.point.totalSpeed = 0;
      }
    }
    return !(nx1 > 165 || nx2 > 165 || x1 > 165 || x2 > 165) && ((x1 > nx2 && x2 > nx1) || (x2 < nx1 && x1 < nx2) || y1 > ny2 || y2 < ny1);
  };
}

function bearingInitial(lat1, long1, lat2, long2) {
  return (bearingDegrees(lat1, long1, lat2, long2) + 360) % 360;
}

function bearingFinal(lat1, long1, lat2, long2) {
  return (bearingDegrees(lat2, long2, lat1, long1) + 180) % 360;
}

function bearingDegrees(lat1, long1, lat2, long2) {
  var degToRad = 1;
  var phi1 = lat1 * degToRad;
  var phi2 = lat2 * degToRad;
  var lam1 = long1 * degToRad;
  var lam2 = long2 * degToRad;
  return Math.atan2(Math.sin(lam2 - lam1) * Math.cos(phi2),
    Math.cos(phi1) * Math.sin(phi2) - Math.sin(phi1) * Math.cos(phi2) * Math.cos(lam2 - lam1)
  ).toDegrees();
}


function getAverageBearing(bearingA, bearingB) {
  bearingA = bearingA.toDegrees();
  bearingB = bearingB.toDegrees();

  if (bearingA > bearingB) {

    var temp = bearingA;
    bearingA = bearingB;

    bearingB = temp;
  }

  if (bearingB - bearingA > 180) bearingB -= 360;

  var finalBearing = (bearingB + bearingA) / 2;

  if (finalBearing < 0) finalBearing += 360;

  return finalBearing.toRadians();
}