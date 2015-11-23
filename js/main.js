var width = innerWidth / 3,
  height = innerHeight / 3,
  startingCount = 500,
  endCount = 500,
  expansionFactor = 1.01,
  additionDelay = 5,
  expansionDelay = 50,
  cooldownFactor = 0.9,
  useForceLayout = false,
  useCollisions = false;

var shipSVG = new Blob(['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g fill="white" stroke="black"><g><path d="M49.862,100c0.404,0,0.778-0.225,0.97-0.582c0.007-0.012,1.576-2.932,3.153-6.388c0.788-1.729,1.579-3.589,2.182-5.304    c0.299-0.859,0.556-1.68,0.737-2.439c0.183-0.762,0.297-1.459,0.298-2.107c0-2.492-0.921-4.708-2.445-6.232    c-1.28-1.285-3.012-2.074-4.895-2.071c-1.887-0.003-3.617,0.786-4.896,2.071c-1.523,1.524-2.448,3.74-2.449,6.231    c0.002,0.649,0.117,1.347,0.3,2.108c0.32,1.329,0.859,2.852,1.485,4.416c1.881,4.679,4.579,9.696,4.587,9.715    C49.082,99.775,49.458,100,49.862,100z"/></g><path d="M86.533,67.531c0,1.242-1.008,1.949-2.248,1.579l-10.338-3.507c-1.241-0.369-2.249-1.674-2.249-2.915V45.412   c0-1.241,1.008-1.947,2.249-1.579l10.338,5.725c1.447,0.78,2.248,1.674,2.248,2.915V67.531z"/><path d="M12.833,67.531c0,1.242,1.007,1.949,2.249,1.579l10.338-3.507c1.241-0.369,2.248-1.674,2.248-2.915V45.412   c0-1.241-1.007-1.947-2.248-1.579l-10.338,5.725c-1.448,0.78-2.249,1.674-2.249,2.915V67.531z"/><g><path d="M67.635,25.731c-0.042-1.168-0.32-2.379-0.881-3.838c-0.694-1.807-1.809-3.929-3.403-6.491    c-3.575-5.73-8.369-11.73-9.753-13.432L53.57,1.936l-0.028-0.035C52.578,0.73,50.984,0.019,49.281,0h-0.082    c-1.727,0-3.317,0.715-4.253,1.914c-0.128,0.164-3.181,4.073-6.246,8.708c-1.875,2.843-3.307,5.261-4.376,7.393    c-0.693,1.39-1.203,2.586-1.561,3.663c-0.488,1.461-0.704,2.683-0.677,3.842c0.01,0.389,0.045,0.772,0.094,1.156    c-0.017,0.194-0.03,0.389-0.03,0.587v36.419c0,3.767,3.055,6.822,6.821,6.822h21.777c3.769,0,6.821-3.056,6.824-6.822    l-0.003-36.37C67.626,26.792,67.648,26.264,67.635,25.731z M49.86,36.207c-4.896,0-8.867-3.97-8.867-8.867s3.97-8.867,8.867-8.867    c4.897,0,8.867,3.97,8.867,8.867S54.758,36.207,49.86,36.207z"/></g></g></svg>'], {
    type: "image/svg+xml;charset=utf-8"
  }),
  domURL = self.URL || self.webkitURL || self,
  url = domURL.createObjectURL(shipSVG),
  shipImg = new Image;

shipImg.src = url;


var asteroidSVG = new Blob(['<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill="#efefef" stroke="#333" stroke-width="3" d="M91.3,52.6c0-2,0.9-4.4,1.8-6.8c1.3-3.7,2.7-7.5,1.4-10.7c-2.3-5.5-7.6-11.2-10.5-14.2c-0.9-0.9-1.9-2.1-3-3.3   c-3.1-3.5-6.6-7.5-10.5-9c-3.1-1.3-7.2-1.4-10.5-1.4c-1.4,0-2.9,0-4.3,0.1c-1.2,0-2.4,0.1-3.5,0.1c-3.8,0-6.2,3.8-8.6,7.4   c-1.6,2.4-3.2,4.9-4.8,5.5c-0.6,0.3-1.5,0.4-2.5,0.4c-1.4,0-3.1-0.3-4.7-0.5c-1.7-0.3-3.5-0.5-5.1-0.5c-2.4,0-4.2,0.6-5.4,1.9   c-3.9,3.9-6.6,9.9-8.6,14.7c-0.6,1.5-1.6,3.2-2.7,5C7.5,44.7,5,48.7,5,52.6c0,3.8,3.7,6.5,7.3,9.1c2.3,1.7,4.8,3.5,5.4,5.1   c2,4.8,3.8,8.7,7.6,12.5c1.2,1.2,2.2,2.7,3.3,4.3c2,2.9,4.1,5.9,7.5,7.4c3.9,1.6,8.3,1.8,12.4,1.8c0.6,0,1.2,0,1.8,0   c0.6,0,1.2,0,1.8,0c4.1,0,7.5-1.7,10.7-3.4c1.2-0.6,2.5-1.3,3.8-1.8c1.5-0.6,3-1.1,4.5-1.5c3.4-1,7-2.1,9.7-4.8   c1.2-1.2,2.8-2.3,4.6-3.5c3.3-2.2,6.6-4.6,8.1-8c1.3-3.2,0.2-7-0.9-10.6C92,56.9,91.3,54.6,91.3,52.6z"/><path stroke="#333" stroke-width="3" fill="#ccc" d="M68.1,29.3c-6,0-10.8,4.9-10.8,10.8S62.1,51,68.1,51s10.8-4.9,10.8-10.8S74.1,29.3,68.1,29.3z "/><path stroke="#333" stroke-width="3" fill="#ccc" d="M38.4,32.7c-3.1,0-5.6,2.4-5.6,5.4c0,3,2.5,5.4,5.6,5.4c3.1,0,5.6-2.4,5.6-5.4C44.1,35.1,41.5,32.7,38.4,32.7z M"/><path stroke="#333" stroke-width="3" fill="#eee" d="M23.5,40.5c-4,0-7.2,4-7.2,9s3.2,9,7.2,9s7.2-4,7.2-9S27.5,40.5,23.5,40.5z"/><path stroke="#333" stroke-width="3" fill="#ddd" d="M54.1,69.5c-4,0-7.3,2.8-7.3,6.2c0,3.4,3.3,6.2,7.3,6.2s7.3-2.8,7.3-6.2C61.4,72.2,58.1,69.5,54.1,69.5z "/></g></svg>'], {
    type: "image/svg+xml;charset=utf-8"
  }),
  domURL = self.URL || self.webkitURL || self,
  url = domURL.createObjectURL(asteroidSVG),
  asteroidImg = new Image;

asteroidImg.src = url;

constants = {
  speedOfLight: 10,
  thrust: 1
};

var ship = {
  position: {
    x: width / 2,
    y: height / 2
  },
  velocity: {
    x: 2,
    y: -1
  },
  direction: 0
};

var asteroid = {
  position: {
    x: width / 4,
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
    ship.velocity.y += constants.thrust;
  }
  if (e.which === 119) {
    ship.velocity.y -= constants.thrust;
  }
  if (e.which === 97) {
    ship.velocity.x -= constants.thrust;
  }
  if (e.which === 100) {
    ship.velocity.x += constants.thrust;
  }
});

function wrapAround(node) {
  if (node.x < 0)
    node.x = width + node.x;
  else if (node.x > width)
    node.x -= width;

  node.px = node.x;

  if (node.y < 0)
    node.y = height + node.y;
  else if (node.y > height)
    node.y -= height;

  node.py = node.y;
}

var color = d3.scale.category20();
var opacity = 1;
var temperature = d3.scale
  .linear()
  .domain([0, 150, 250, 350])
  .range(['black', 'red', 'orange', 'white']);

var nodes = d3.range(startingCount)
  .map(function (i) {
    return {
      color: color(i),
      collisions: 0,
      radius: Math.random() * 5 + 15,
      x: Math.random() * width,
      y: Math.random() * height
    };
  }),
  root = nodes[0];

root.x = width / 2;
root.y = height / 2;
root.radius = 0;
root.fixed = true;

var force = d3.layout.force();

useForceLayout && force
  .gravity(0)
  .charge(function (d, i) {
    return i ? 0 : -1;
  })
  .nodes(nodes)
  .size([width, height])
  .start();

! function addOne() {
  nodes.push({
    color: color(nodes.length),
    collisions: 0,
    radius: Math.random() * 5 + 15,
    x: Math.random() * width,
    y: Math.random() * height
  });
  useForceLayout && force.nodes(nodes).start();

  if (nodes.length < endCount)
    setTimeout(addOne, additionDelay);
  else
    setTimeout(bigger, expansionDelay);
}()

function bigger() {
  width *= expansionFactor;
  height *= expansionFactor;

  canvas
    .attr("width", width)
    .attr("height", height);

  nodes.forEach(function (node) {
    node.px = node.x *= expansionFactor;
    node.py = node.y *= expansionFactor;
  });

  ship.position.x *= expansionFactor;
  ship.position.y *= expansionFactor;

  asteroid.position.x *= expansionFactor;
  asteroid.position.y *= expansionFactor;

  force
    .size([width, height])
    .start();

  if (width < innerWidth && height < innerHeight)
    setTimeout(bigger, expansionDelay);
}



var canvas = d3.select("body").append("canvas")
  .attr("width", width)
  .attr("height", height);

var context = canvas.node().getContext("2d");
useForceLayout ? force.on("tick", tick) : d3.timer(tick);

function tick(e) {
  nodes.forEach(function (node) {
    node.collisions = Math.min(node.collisions, 400);
    node.collisions *= cooldownFactor;
  });

  //  nodes.forEach(wrapAround);

  var q = d3.geom.quadtree(nodes),
    i,
    d,
    n = nodes.length;

  if (useCollisions)
    for (i = 1; i < n; ++i) q.visit(collide(nodes[i]));

}
d3.timer(render);

function render() {
  var renderNodes = [];

  nodes.forEach(function (node) {
    renderNodes.push(node);
    var nodeX = node.x; //(width / 2 + (node.x - ship.position.x)) % width;
    var nodeY = node.y; //(height / 2 + (node.y - ship.position.y)) % height;
    //    if (nodeX - 2 * node.radius < 0)
    //      renderNodes.push({
    //        x: width + node.x,
    //        y: node.y,
    //        collisions: node.collisions,
    //        radius: node.radius
    //      });
    //
    //    if (nodeX + 2 * node.radius > width)
    //      renderNodes.push({
    //        x: node.x - width,
    //        y: node.y,
    //        collisions: node.collisions,
    //        radius: node.radius
    //      });
    //
    //    if (nodeY - 2 * node.radius < 0)
    //      renderNodes.push({
    //        x: node.x,
    //        y: height + node.y,
    //        collisions: node.collisions,
    //        radius: node.radius
    //      });
    //
    //    if (nodeY + 2 * node.radius > height)
    //      renderNodes.push({
    //        x: node.x,
    //        y: node.y - height,
    //        collisions: node.collisions,
    //        radius: node.radius
    //      });
  });


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

  //  nodes.forEach(wrapAround);
  context.clearRect(0, 0, width, height);
  n = renderNodes.length;
  for (i = n - 1; i >= 0; --i) {
    d = renderNodes[i];
    var nodeX = (width + (d.x - ship.position.x)) % width;
    var nodeY = (height + (d.y - ship.position.y)) % height;
    context.beginPath();
    context.strokeStyle = "white";
    context.fillStyle = temperature(d.collisions);
    context.moveTo(nodeX, nodeY);
    context.arc(nodeX, nodeY, d.radius, 0, 2 * Math.PI);
//    context.stroke();
    context.fill();
  }
  nodes.forEach(wrapAround);

  function renderShip(x, y, angle) {
    context.save();
    context.translate(x, y);
    context.rotate(angle + Math.PI / 2);
    context.translate(-x - 50, -y - 50);
    context.beginPath();
    context.fillStyle = "white";
    context.drawImage(shipImg, x, y);
    context.fill();
    context.restore();
  }

  wrapAround(asteroid.position);

  var asteroidX = (width / 2 + (asteroid.position.x - ship.position.x)) % width;
  var asteroidY = (height / 2 + (asteroid.position.y - ship.position.y)) % height;

  function renderAsteroid(x, y, angle) {
    context.save();
    context.translate(x, y);
    context.rotate(angle + Math.PI / 2);
    context.translate(-x - 50, -y - 50);
    context.beginPath();
    context.fillStyle = "white";
    context.drawImage(asteroidImg, x, y);
    context.fill();
    context.restore();
  }
  renderAsteroid(asteroidX, asteroidY, 0);


  if (asteroidX - 100 < 0) {
    renderAsteroid(width + asteroidX, asteroidY, 0);
  }

  if (asteroidX + 100 > width) {
    renderAsteroid(asteroidX - width, asteroidY, 0);
  }

  if (asteroidY - 125 < 0) {
    renderAsteroid(asteroidX, height + asteroidY, 0);
  }

  if (asteroidY + 125 > height) {
    renderAsteroid(asteroidX, asteroidY - height, 0);
  }

  renderShip(width / 2, height / 2, ship.direction);
  //  renderShip(ship.position.x, ship.position.y, ship.direction);
  //
  //  if (ship.position.x - 100 < 0) {
  //    renderShip(width + ship.position.x, ship.position.y, ship.direction);
  //  }
  //
  //  if (ship.position.x + 100 > width) {
  //    renderShip(ship.position.x - width, ship.position.y, ship.direction);
  //  }
  //
  //  if (ship.position.y - 100 < 0) {
  //    renderShip(ship.position.x, height + ship.position.y, ship.direction);
  //  }
  //
  //  if (ship.position.y + 100 > height) {
  //    renderShip(ship.position.x, ship.position.y - height, ship.direction);
  //  }
}

canvas.on("mousemove", function () {
  var p1 = d3.mouse(this);
  root.px = p1[0];
  root.py = p1[1];
  force.resume();
});

function collide(node) {
  var r = node.radius + 16,
    nx1 = node.x - r,
    nx2 = node.x + r,
    ny1 = node.y - r,
    ny2 = node.y + r;
  return function (quad, x1, y1, x2, y2) {
    if (quad.point && (quad.point !== node)) {
      var x = node.x - quad.point.x,
        y = node.y - quad.point.y;

      if (Math.abs(x) > width / 2) x = x > 0 ? x - width : x + width;
      if (Math.abs(y) > height / 2) y = y > 0 ? y - height : y + height;

      var l = Math.sqrt(x * x + y * y),
        r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .1;
        x = (x * l);
        y = (y * l);
        node.x -= x;
        node.y -= y;
        node.collisions++;
        quad.point.x += x;
        quad.point.y += y;
        quad.point.collisions++;
      }
    }
    return (x1 > nx2 && x2 < width && nx1 > 0) || (x2 < nx1 && nx2 < width && x1 > 0) || (y1 > ny2 && y2 < height && ny1 > 0) || (y2 < ny1 && ny2 < height && y1 > 0);
  };
}