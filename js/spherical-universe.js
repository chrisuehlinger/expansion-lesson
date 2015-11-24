var width = 960,
  height = 960,
  cooldownFactor = 0.9,
  expansionFactor = 1.01,
  startCount = 50,
  endCount = 300,
  additionDelay = 50,
  expansionDelay = 100,
  currentExpansion = 1,
  maxExpansion = 2;

constants = {
  speedOfLight: 10,
  thrust: 1
};

function createNode() {
  return {
    collisions: 0,
    radius: Math.random() * 5 + 10
  };
}

var color = d3.scale.category20();
var temperature = d3.scale
  .linear()
  .domain([0, 33, 67, 100])
  .range(['black', 'red', 'orange', 'white']);

var nodes = d3.range(startCount).map(createNode),
  root = nodes[0];

root.radius = 3;
root.fixed = true;

var force = d3.layout.force()
  .gravity(0)
  .charge(function (d, i) {
    return i ? 0 : -0;
  })
  .nodes(nodes)
  .size([360, 180]);

force.start();

function collide(node) {
  var r = node.radius + 16,
    nx1 = node.x - r,
    nx2 = node.x + r,
    ny1 = node.y - r,
    ny2 = node.y + r;
  return function (quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var lat1 = (node.x - 180), lat2 = (quad.point.x - 180),
          lon1 = (node.y - 90), lon2 = (quad.point.y - 90)
      var R = 180 / Math.PI; // metres
      var φ1 = lat1* Math.PI / 180;
      var φ2 = lat2* Math.PI / 180;
      var Δφ = (lat2 - lat1)* Math.PI / 180;
      var Δλ = (lon2 - lon1)* Math.PI / 180;

      var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      var l = R * c,
          r = node.radius + quad.point.radius;
      
//      var x = node.x - quad.point.x,
//        y = node.y - quad.point.y;
//
//      if (Math.abs(x) > 180) x = x > 0 ? x - 360 : x + 360;
//
//      var l = Math.sqrt(x * x + y * y),
//        r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * 0.25;
        node.x -= (lat2 - lat1) * l;
        node.y -= (lon2 - lon1) * l;
        node.collisions++;
        quad.point.x += (lat2 - lat1) * l;
        quad.point.y += (lon2 - lon1) * l;
        quad.point.collisions++;
      }
    }
    return (x1 > nx2 && x2 < 360 && nx1 > 0) || (x2 < nx1 && nx2 < 360 && x1 > 0) || y1 > ny2 || y2 < ny1;
  };
}

var projection, currentProjectionScale;

//currentProjectionScale = 150;
//projection = d3.geo.mollweide()
//  .rotate([0, 0])
//  .scale(currentProjectionScale) // we'll scale up to match viewport shortly.
//  .translate([width / 2, height / 2]);

//currentProjectionScale = 240;
//projection = d3.geo.orthographic()
//  .translate([400, 400])
//  .scale(currentProjectionScale)
//  .clipAngle(90);

currentProjectionScale = 75;
projection = d3.geo.azimuthalEquidistant()
  .scale(currentProjectionScale)
  .rotate([74.0064, -40.7142])
  .clipAngle(180 - 1e-3)
  .translate([width / 2, height / 2])
  .precision(.1);

var canvas = d3.select("body").append("canvas")
  .attr("width", width)
  .attr("height", height);

var c = canvas.node().getContext("2d");

var path = d3.geo.path()
  .projection(projection)
  .context(c);

var title = d3.select("h1");

queue()
  .defer(d3.json, "data/world-110m.json")
  .defer(d3.tsv, "data/world-country-names.tsv")
  .await(ready);

canvas.on("mousemove", function () {
  var p1 = d3.mouse(this);
  root.px = p1[0];
  root.py = -p1[1] / 2;
  force.resume();
});


var ship = {
  position: {
    x: width / 2,
    y: height / 2
  },
  velocity: {
    x: 0,
    y: 0
  },
  direction: 0
};

$(window).on('keypress', function (e) {
  //    console.log(e.which);
  if (e.which === 115) {
    ship.velocity.y -= constants.thrust;
  }
  if (e.which === 119) {
    ship.velocity.y += constants.thrust;
  }
  if (e.which === 97) {
    ship.velocity.x -= constants.thrust;
  }
  if (e.which === 100) {
    ship.velocity.x += constants.thrust;
  }
});

function wrapAround(node) {
  if (node.x < 0) {
    node.x += 360;
    node.px += 360;
  }

  if (node.x > 360) {
    node.x -= 360;
    node.px -= 360;
  }

  if (node.y < 0) {
    node.py = node.y *= -1;
    node.px = node.x = (node.x + 180) % 360;
  }

  if (node.y > 180) {
    node.py = node.y = 180 - (node.y - 180);
    node.px = node.x = (node.x + 180) % 360;
  }
}

function ready(error, world, names) {
  if (error) throw error;

  force.on("tick", function (e) {
    nodes.forEach(function (node) {
      node.collisions = Math.min(node.collisions, 400);
      node.collisions *= cooldownFactor;
    });
    var q = d3.geom.quadtree(nodes),
      i,
      d,
      n = nodes.length;

    for (i = 1; i < n; ++i) q.visit(collide(nodes[i]));

    nodes.forEach(wrapAround);


    ship.direction = Math.atan2(ship.velocity.y, ship.velocity.x);
    ship.totalSpeed = Math.sqrt(Math.pow(ship.velocity.x, 2) + Math.pow(ship.velocity.y, 2));
    if (ship.totalSpeed > constants.speedOfLight) {
      ship.totalSpeed = constants.speedOfLight;
      ship.velocity.x = Math.cos(ship.direction) * ship.totalSpeed;
      ship.velocity.y = Math.sin(ship.direction) * ship.totalSpeed;
    }

    ship.position.x += ship.velocity.x;
    ship.position.y += ship.velocity.y;

    wrapAround(ship.position);

    render();
  });

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

  var lastRenderTime = Date.now();

  function render() {
    //    console.log('Time since last render: ' + (Date.now() - lastRenderTime) + ' ms');
    lastRenderTime = Date.now();
    projection.rotate([-(nodes[0].x - 180), -(nodes[0].y - 90)]);

    c.clearRect(0, 0, width, height);

    c.fillStyle = "steelblue";
    var circle = d3.geo.circle();
    for (var j = nodes.length - 1; j >= 0; --j) {
      var d = nodes[j];
      circle.origin([d.x - 180, d.y - 90]);
      circle.angle(d.radius);

      c.beginPath();
      path(circle());

      if (j) {
        c.fillStyle = temperature(d.collisions);
        c.fill();
        c.strokeStyle = 'white';
        c.stroke();
      } else {
        c.strokeStyle = 'green';
        c.stroke();
      }
    }

    circle.origin([ship.position.x - 180, ship.position.y - 90]);
    circle.angle(3);
    c.strokeStyle = 'green';
    c.beginPath();
    path(circle());
    c.stroke();


    //        c.fillStyle = "#bbb", c.beginPath(), path(land), c.fill();
    //        c.fillStyle = "#f00", c.beginPath(), path(countries[i]), c.fill();
    //        c.strokeStyle = "#fff", c.lineWidth = .5, c.beginPath(), path(borders), c.stroke();
    //        c.strokeStyle = "#000", c.lineWidth = 2, c.beginPath(), path(globe), c.stroke();

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
      c.strokeStyle = j===90 ? '#0f0' : '#fff';
      circle.origin([j, 0]);
      c.beginPath();
      path(circle());
      c.stroke();
    }
  }

  //    console.log(countries[0]);
}

! function addOne() {
  nodes.push(createNode());
  force.nodes(nodes);
  force.start();

  if (nodes.length < endCount)
    setTimeout(addOne, additionDelay);
  else
    setTimeout(bigger, expansionDelay);
}()

function bigger() {
  currentExpansion *= expansionFactor;
  nodes.forEach(function (node) {
    node.radius *= 1 / expansionFactor;
  });

  projection.scale(currentProjectionScale * currentExpansion);

  if (currentExpansion < maxExpansion)
    setTimeout(bigger, expansionDelay);
}