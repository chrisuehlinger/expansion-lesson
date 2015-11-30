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
  speedOfLight: 1000,
  thrust: 1,
  width: 960,
  height: 960,
  startingCount: 50,
  endCount: 100,
  expansionFactor: 1.01,
  additionDelay: 5,
  expansionWait: 5000,
  expansionDelay: 0,
  maxExpansion: 2,
  cooldownFactor: 0.9,
  collisionForce: 0.1,
  useForceLayout: false,
  useCollisions: true,
  outlineParticles: true,
  renderGraticules: true,
  renderPlanet: false
};

window.onload = function () {
  var gui = new dat.GUI();
  gui.add(constants, 'speedOfLight', 0, 100);
  gui.add(constants, 'thrust', 0, 5);
  gui.add(constants, 'endCount', 0, 1000);
  gui.add(constants, 'expansionFactor', 1, 1.5);
  gui.add(constants, 'additionDelay', 0, 100);
  gui.add(constants, 'expansionWait', 0, 10000);
  gui.add(constants, 'expansionDelay', 0, 500);
  gui.add(constants, 'cooldownFactor', 0, 1);
  gui.add(constants, 'collisionForce', 0, 1);
  gui.add(constants, 'useForceLayout');
  gui.add(constants, 'useCollisions');
  gui.add(constants, 'outlineParticles');
  gui.add(constants, 'renderGraticules');
  gui.add(constants, 'renderPlanet');
};

var currentExpansion = 1;

function createNode() {
  return {
    collisions: 0,
    radius: Math.random() * 5 + 10,
    x: Math.random() * 360 - 180,
    y: Math.random() * 180 - 90,
    direction: Math.random() * 2 * Math.PI,
    totalSpeed: 100
  };
}

var ship = {
  x: 90,
  y: 45,
  direction: Math.PI / 3,
  totalSpeed: 100
};

var color = d3.scale.category20();
var temperature = d3.scale
  .linear()
  .domain([0, 33, 67, 100])
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

function addOne() {
  nodes.push(createNode());

  constants.useForceLayout && force.nodes(nodes).start();

  if (nodes.length < constants.endCount)
    setTimeout(addOne, constants.additionDelay);
  else
    setTimeout(bigger, constants.expansionWait);
}

function bigger() {
  currentExpansion *= constants.expansionFactor;
  nodes.forEach(function (node) {
    node.radius *= 1 / constants.expansionFactor;
  });

  projection.scale(currentProjectionScale * currentExpansion);

  if (currentExpansion < constants.maxExpansion)
    setTimeout(bigger, constants.expansionDelay);
}

var projection, currentProjectionScale;

//currentProjectionScale = 150;
//projection = d3.geo.mollweide()
//  .rotate([0, 0])
//  .scale(currentProjectionScale) // we'll scale up to match viewport shortly.
//  .translate([constants.width / 2, constants.height / 2]);

//currentProjectionScale = 240;
//projection = d3.geo.orthographic()
//  .translate([400, 400])
//  .scale(currentProjectionScale)
//  .clipAngle(90);

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

queue()
  .defer(d3.json, "data/world-110m.json")
  .defer(d3.tsv, "data/world-country-names.tsv")
  .await(ready);

$(window).on('keypress', function (e) {
  //console.log(e.which);
  if (e.which === 115) {
    ship.totalSpeed *= 1.1;
    if (ship.totalSpeed > constants.speedOfLight) {
      ship.totalSpeed = constants.speedOfLight;
    }
  }
  if (e.which === 119) {
    ship.totalSpeed *= 0.9;
    if (ship.totalSpeed > constants.speedOfLight) {
      ship.totalSpeed = constants.speedOfLight;
    }
  }
  if (e.which === 97) {
    ship.direction -= 5 * constants.thrust * Math.PI / 180;
  }
  if (e.which === 100) {
    ship.direction += 5 * constants.thrust * Math.PI / 180;
  }
});

function wrapAround(node) {
  if (node.x < -180) {
    node.x += 360;
    node.px += 360;
  }

  if (node.x > 180) {
    node.x -= 360;
    node.px -= 360;
  }

  if (node.y <= -90) {
    node.py = node.y *= -1;
    node.px = node.x = (node.x + 180) % 360;
    node.vy *= -1;
  }

  if (node.y >= 90) {
    node.py = node.y = 180 - (node.y - 180);
    node.px = node.x = (node.x + 180) % 360;
    node.vy *= -1;
  }
}

function ready(error, world, names) {
  if (error) throw error;

  var globe = {
      type: "Sphere"
    },
    land = topojson.feature(world, world.objects.land),
    countries = topojson.feature(world, world.objects.countries).features,
    borders = topojson.mesh(world, world.objects.countries, function (a, b) {
      return a !== b;
    }),
    i = -1,
    n = countries.length;

  countries = countries.filter(function (d) {
    return names.some(function (n) {
      if (d.id == n.id) return d.name = n.name;
    });
  }).sort(function (a, b) {
    return a.name.localeCompare(b.name);
  });

  //    (function transition() {
  //      d3.transition()
  //        .duration(1250)
  //        .each("start", function () {
  //          title.text(countries[i = (i + 1) % n].name);
  //        })
  //        .tween("rotate", function () {
  //          var p = d3.geo.centroid(countries[i]),
  //            r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
  //          return function (t) {
  //            projection.rotate(r(t));
  //            render();
  //          };
  //        })
  //        .transition()
  //        .each("end", transition);
  //    })();


  constants.useForceLayout ? force.on("tick", tick) : d3.timer(tick);

  function tick() {
    nodes.forEach(function (node) {
      node.collisions = Math.min(node.collisions, 400);
      node.collisions *= constants.cooldownFactor;
    });
    var q = d3.geom.quadtree(nodes),
      i,
      d,
      n = nodes.length;

    if (constants.useCollisions)
      for (i = 0; i < n; ++i) q.visit(collide(nodes[i]));

    nodes.forEach(wrapAround);


    wrapAround(ship);

    //    ship.direction = Math.atan2(ship.vy, ship.vx);
    //    ship.totalSpeed = Math.sqrt(Math.pow(ship.vx, 2) + Math.pow(ship.vy, 2));
    if (ship.totalSpeed > constants.speedOfLight) {
      ship.totalSpeed = constants.speedOfLight;
      //      ship.vx = Math.cos(ship.direction) * ship.totalSpeed;
      //      ship.vy = Math.sin(ship.direction) * ship.totalSpeed;
    }

    var lon = ship.x * Math.PI / 180;
    var lat = ship.y * Math.PI / 180;
    var R = 180 / Math.PI;
    var d = ship.totalSpeed * Math.PI / 180;
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

    //    console.log(d, brng * 180 / Math.PI, φ2 * 180 / Math.PI, λ2 * 180 / Math.PI);



    //    wrapAround(ship);

    nodes.forEach(function (node) {

      var lon = node.x * Math.PI / 180;
      var lat = node.y * Math.PI / 180;
      var R = 180 / Math.PI;
      var d = node.totalSpeed * Math.PI / 180;
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
    });
  }

  d3.timer(render);

  function render() {
    //    console.log(ship.direction * 180 / Math.PI);
    c.save();
    c.translate(constants.width / 2, constants.height / 2);
    c.rotate(-ship.direction);
    c.translate(-constants.width / 2, -constants.height / 2);

    projection.rotate([-ship.x, -ship.y]);

    c.clearRect(0, 0, constants.width, constants.height);

    var circle = d3.geo.circle();
    for (var j = nodes.length - 1; j >= 0; --j) {
      var d = nodes[j];
      circle.origin([d.x, d.y]);
      circle.angle(d.radius);

      c.beginPath();
      path(circle());

      c.fillStyle = temperature(d.collisions);
      c.fill();
      c.strokeStyle = 'white';
      constants.outlineParticles && c.stroke();
    }

    circle.origin([ship.x, ship.y]);
    circle.angle(3);
    c.strokeStyle = 'green';
    c.beginPath();
    path(circle());
    c.stroke();


    if (constants.renderPlanet) {
      c.fillStyle = "#bbb", c.beginPath(), path(land), c.fill();
      c.fillStyle = "#f00", c.beginPath(), path(countries[i]), c.fill();
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
    c.restore();
  }
}

function collide(node) {
  var r = node.radius + 16,
    nx1 = node.x - r,
    nx2 = node.x + r,
    ny1 = node.y - r,
    ny2 = node.y + r;
  return function (quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var lat1 = (node.x),
        lat2 = (quad.point.x),
        lon1 = (node.y),
        lon2 = (quad.point.y)
      var R = 180 / Math.PI; // metres
      var λ1 = lon1.toRadians();
      var λ2 = lon2.toRadians();
      var φ1 = lat1.toRadians();
      var φ2 = lat2.toRadians();
      var Δφ = φ2 - φ1;
      var Δλ = λ2 - λ1;

      var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      var l = R * c,
        r = node.radius + quad.point.radius;

      if (l < r) {
        l = (l - r) / l * constants.collisionForce;
        
        node.x += Δλ.toDegrees() * l;
        node.y += Δφ.toDegrees() * l;
        node.collisions++;
        quad.point.x -= Δλ.toDegrees() * l;
        quad.point.y -= Δφ.toDegrees() * l;
        quad.point.collisions++;
        
        if(Δλ > Δφ ? node.x > quad.point.x : node.y > quad.point.y){
          node.direction = (bearingFinal(φ1,λ1,φ2,λ2)).toRadians();
          quad.point.direction = (bearingInitial(φ1,λ1,φ2,λ2)).toRadians();
        } else {
          quad.point.direction = (bearingFinal(φ1,λ1,φ2,λ2)).toRadians();
          node.direction = (bearingInitial(φ1,λ1,φ2,λ2)).toRadians();
        }
      }
    }
    return Math.random() > 0.99; //(x1 > nx2 && x2 < 360 && nx1 > 0) || (x2 < nx1 && nx2 < 360 && x1 > 0) || y1 > ny2 || y2 < ny1;
  };
}

function bearingInitial (lat1, long1, lat2, long2){
    return (bearingDegrees(lat1, long1, lat2, long2) + 360) % 360;
}
function bearingFinal(lat1, long1, lat2, long2) {
    return (bearingDegrees(lat2, long2, lat1, long1) + 180) % 360;
}

function bearingDegrees(lat1, long1, lat2, long2)
{
    var degToRad= 1;
    var phi1= lat1 * degToRad;
    var phi2= lat2 * degToRad;
    var lam1= long1 * degToRad;
    var lam2= long2 * degToRad;
    return Math.atan2(Math.sin(lam2-lam1) * Math.cos(phi2),
        Math.cos(phi1)*Math.sin(phi2) - Math.sin(phi1)*Math.cos(phi2)*Math.cos(lam2-lam1)
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