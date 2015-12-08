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

  var shipXML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g fill="white" stroke="black"><g><path d="M49.862,100c0.404,0,0.778-0.225,0.97-0.582c0.007-0.012,1.576-2.932,3.153-6.388c0.788-1.729,1.579-3.589,2.182-5.304    c0.299-0.859,0.556-1.68,0.737-2.439c0.183-0.762,0.297-1.459,0.298-2.107c0-2.492-0.921-4.708-2.445-6.232    c-1.28-1.285-3.012-2.074-4.895-2.071c-1.887-0.003-3.617,0.786-4.896,2.071c-1.523,1.524-2.448,3.74-2.449,6.231    c0.002,0.649,0.117,1.347,0.3,2.108c0.32,1.329,0.859,2.852,1.485,4.416c1.881,4.679,4.579,9.696,4.587,9.715    C49.082,99.775,49.458,100,49.862,100z"/></g><path d="M86.533,67.531c0,1.242-1.008,1.949-2.248,1.579l-10.338-3.507c-1.241-0.369-2.249-1.674-2.249-2.915V45.412   c0-1.241,1.008-1.947,2.249-1.579l10.338,5.725c1.447,0.78,2.248,1.674,2.248,2.915V67.531z"/><path d="M12.833,67.531c0,1.242,1.007,1.949,2.249,1.579l10.338-3.507c1.241-0.369,2.248-1.674,2.248-2.915V45.412   c0-1.241-1.007-1.947-2.248-1.579l-10.338,5.725c-1.448,0.78-2.249,1.674-2.249,2.915V67.531z"/><g><path d="M67.635,25.731c-0.042-1.168-0.32-2.379-0.881-3.838c-0.694-1.807-1.809-3.929-3.403-6.491    c-3.575-5.73-8.369-11.73-9.753-13.432L53.57,1.936l-0.028-0.035C52.578,0.73,50.984,0.019,49.281,0h-0.082    c-1.727,0-3.317,0.715-4.253,1.914c-0.128,0.164-3.181,4.073-6.246,8.708c-1.875,2.843-3.307,5.261-4.376,7.393    c-0.693,1.39-1.203,2.586-1.561,3.663c-0.488,1.461-0.704,2.683-0.677,3.842c0.01,0.389,0.045,0.772,0.094,1.156    c-0.017,0.194-0.03,0.389-0.03,0.587v36.419c0,3.767,3.055,6.822,6.821,6.822h21.777c3.769,0,6.821-3.056,6.824-6.822    l-0.003-36.37C67.626,26.792,67.648,26.264,67.635,25.731z M49.86,36.207c-4.896,0-8.867-3.97-8.867-8.867s3.97-8.867,8.867-8.867    c4.897,0,8.867,3.97,8.867,8.867S54.758,36.207,49.86,36.207z"/></g></g></svg>',
    asteroidXML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve"><g><path fill="#efefef" stroke="#333" stroke-width="3" d="M91.3,52.6c0-2,0.9-4.4,1.8-6.8c1.3-3.7,2.7-7.5,1.4-10.7c-2.3-5.5-7.6-11.2-10.5-14.2c-0.9-0.9-1.9-2.1-3-3.3   c-3.1-3.5-6.6-7.5-10.5-9c-3.1-1.3-7.2-1.4-10.5-1.4c-1.4,0-2.9,0-4.3,0.1c-1.2,0-2.4,0.1-3.5,0.1c-3.8,0-6.2,3.8-8.6,7.4   c-1.6,2.4-3.2,4.9-4.8,5.5c-0.6,0.3-1.5,0.4-2.5,0.4c-1.4,0-3.1-0.3-4.7-0.5c-1.7-0.3-3.5-0.5-5.1-0.5c-2.4,0-4.2,0.6-5.4,1.9   c-3.9,3.9-6.6,9.9-8.6,14.7c-0.6,1.5-1.6,3.2-2.7,5C7.5,44.7,5,48.7,5,52.6c0,3.8,3.7,6.5,7.3,9.1c2.3,1.7,4.8,3.5,5.4,5.1   c2,4.8,3.8,8.7,7.6,12.5c1.2,1.2,2.2,2.7,3.3,4.3c2,2.9,4.1,5.9,7.5,7.4c3.9,1.6,8.3,1.8,12.4,1.8c0.6,0,1.2,0,1.8,0   c0.6,0,1.2,0,1.8,0c4.1,0,7.5-1.7,10.7-3.4c1.2-0.6,2.5-1.3,3.8-1.8c1.5-0.6,3-1.1,4.5-1.5c3.4-1,7-2.1,9.7-4.8   c1.2-1.2,2.8-2.3,4.6-3.5c3.3-2.2,6.6-4.6,8.1-8c1.3-3.2,0.2-7-0.9-10.6C92,56.9,91.3,54.6,91.3,52.6z"/><path stroke="#333" stroke-width="3" fill="#ccc" d="M68.1,29.3c-6,0-10.8,4.9-10.8,10.8S62.1,51,68.1,51s10.8-4.9,10.8-10.8S74.1,29.3,68.1,29.3z "/><path stroke="#333" stroke-width="3" fill="#ccc" d="M38.4,32.7c-3.1,0-5.6,2.4-5.6,5.4c0,3,2.5,5.4,5.6,5.4c3.1,0,5.6-2.4,5.6-5.4C44.1,35.1,41.5,32.7,38.4,32.7z M"/><path stroke="#333" stroke-width="3" fill="#eee" d="M23.5,40.5c-4,0-7.2,4-7.2,9s3.2,9,7.2,9s7.2-4,7.2-9S27.5,40.5,23.5,40.5z"/><path stroke="#333" stroke-width="3" fill="#ddd" d="M54.1,69.5c-4,0-7.3,2.8-7.3,6.2c0,3.4,3.3,6.2,7.3,6.2s7.3-2.8,7.3-6.2C61.4,72.2,58.1,69.5,54.1,69.5z "/></g></svg>',
    shipImg = svgToImage(shipXML),
    asteroidImg = svgToImage(asteroidXML);
  
  function svgToImage(xml){
    var url = 'data:image/svg+xml;base64,' + btoa(xml);
    var img = new Image();
    img.src = url;
    return img;
  }


function RectangularUniverse(canvasSelector, options) {

  //  var defaults = {
  //  speedOfLight: 10,
  //  thrust: 1,
  //  canvasWidth: innerWidth,
  //  canvasHeight: innerHeight,
  //  width: innerWidth / 4,
  //  height: innerHeight / 4,
  //  maxWidth: 2 * innerWidth,
  //  maxHeight: 2 * innerHeight,
  //  startingCount: 10,
  //  endCount: 300,
  //  expansionFactor: 1.01,
  //  additionDelay: 50,
  //  expansionWait: 5000,
  //  expansionDelay: 0,
  //  cooldownFactor: 0.9,
  //  collisionForce: 0.1,
  //  useForceLayout: false,
  //  useCollisions: true,
  //  outlineParticles: true,
  //  shipCentered: true
  //};
  //  
  //  options = _.default(options, defaults);


  var ship = {
    x: options.width / 2,
    y: options.height / 2,
    vx: 0,
    vy: 0,
    direction: 0,
    totalSpeed: 0,
  };

  var asteroid = {
    x: options.width / 4,
    y: options.height / 2,
    vx: 0,
    vy: 0,
    direction: 0
  };

  function createNode() {
    return {
      collisions: 0,
      radius: Math.random() * 5 + 15,
      x: Math.random() * options.width,
      y: Math.random() * options.height,
      vx: 2 * Math.random() - 1,
      vy: 2 * Math.random() - 1
    };
  }
  var opacity = 1;
  var temperature = d3.scale
    .linear()
    .domain([0, 100, 150, 200])
    .range(['black', 'red', 'orange', 'white']);

  function wrapAround(node) {
    if (node.x < 0)
      node.x = options.width + node.x;
    else if (node.x > options.width)
      node.x -= options.width;

    node.px = node.x;

    if (node.y < 0)
      node.y = options.height + node.y;
    else if (node.y > options.height)
      node.y -= options.height;

    node.py = node.y;
  }

  var nodes = d3.range(options.startingCount)
    .map(createNode);

  var force = d3.layout.force();

  options.useForceLayout && force
    .gravity(0)
    .charge(function (d, i) {
      return i ? 0 : -1;
    })
    .nodes(nodes)
    .size([options.width, options.height])
    .start();

  this.addOne = function () {
    if (!inView || options.paused)
      return setTimeout(this.addOne, options.additionDelay);

    if (nodes.length < options.endCount) {
      nodes.push(createNode());
      options.useForceLayout && force.nodes(nodes).start();
      setTimeout(this.addOne, options.additionDelay);
    } else {
      this.filledCallback && setTimeout(this.filledCallback);
    }
  }.bind(this);

  this.expand = function () {
    if (!inView || options.paused)
      return setTimeout(this.expand, options.expansionDelay);

    if (options.width < options.maxWidth && options.height < options.maxHeight) {
      options.width *= options.expansionFactor;
      options.height *= options.expansionFactor;

      nodes.forEach(function (node) {
        node.x *= options.expansionFactor;
        node.y *= options.expansionFactor;
      });

      ship.x *= options.expansionFactor;
      ship.y *= options.expansionFactor;

      asteroid.x *= options.expansionFactor;
      asteroid.y *= options.expansionFactor;

      force
        .size([options.width, options.height])
        .start();


      setTimeout(this.expand, options.expansionDelay);
    } else {
      this.expansionCallback && setTimeout(this.expansionCallback);
    }
  }.bind(this);

  var canvas = d3.select(canvasSelector)
    .attr("width", options.canvasWidth)
    .attr("height", options.canvasHeight);

  var isMousedown = false,
    mousePosition = {
      x: 0,
      y: 0
    };
  $(canvasSelector).on('mousedown', function (e) {
    isMousedown = true;
    mousePosition = {
      x: e.offsetX,
      y: e.offsetY
    };
    $(this)
      .on('mousemove', function (e) {
        mousePosition = {
          x: e.offsetX,
          y: e.offsetY
        };

      })
      .on('mouseup touchend', function (e) {
        $(this).off('mousemove mouseup');
        isMousedown = false;
      });

  });


  $(canvasSelector).on('touchstart', function (e) {
    isMousedown = true;
    console.log(e);
    e.preventDefault();
    mousePosition = {
      x: e.originalEvent.changedTouches[0].pageX,
      y: e.originalEvent.changedTouches[0].pageY - canvasTop
    };
    $(this)
      .on('touchmove', function (e) {
        mousePosition = {
          x: e.originalEvent.changedTouches[0].pageX,
          y: e.originalEvent.changedTouches[0].pageY - canvasTop
        };

      })
      .on('touchend touchcancel', function (e) {
        $(this).off('touchmove touchend touchcancel');
        isMousedown = false;
      });

  });

  function moveTowards(x, y) {
    console.log(x, y);
    var dx, dy;
    if (options.shipCentered) {
      dx = x - options.canvasWidth / 2;
      dy = y - options.canvasHeight / 2;
    } else {
      dx = x - (ship.x + Math.max(0,(options.canvasWidth - options.width) / 2));
      dy = y - (ship.y + Math.max(0, (options.canvasHeight - options.height) / 2));
    }

    dx /= options.canvasWidth;
    dy /= options.canvasHeight;
    
    var vx = ship.totalSpeed * Math.cos(ship.direction),
      vy = ship.totalSpeed * Math.sin(ship.direction),
      newVx = vx + dx,
      newVy = vy + dy;

    ship.totalSpeed = Math.sqrt(newVx * newVx + newVy * newVy);
    ship.direction = Math.atan2(newVy, newVx);
  }

  $(document).on('keydown', function (e) {
    if (!inView || options.paused)
      return;
        console.log(e.keyCode);
    if (e.keyCode === 83) {
      ship.totalSpeed -= options.thrust;
    }
    if (e.keyCode === 87) {
      ship.totalSpeed += options.thrust;
    }
    if (e.keyCode === 65) {
      ship.direction -= 3 * options.thrust * Math.PI / 180;
    }
    if (e.keyCode === 68) {
      ship.direction += 3 * options.thrust * Math.PI / 180;
    }
  });
  
  this.pause = function(){
    options.paused = true;
  }
  
  this.unpause = function(){
    options.paused = false;
  }

  var canvasTop, canvasBottom, inView = false;
  setTimeout(function () {
    var windowTop = $(window).scrollTop(),
      windowBottom = windowTop + $(window).height();

    canvasTop = $(canvasSelector).offset().top;
    canvasBottom = canvasTop + options.canvasHeight;

    inView = canvasTop < windowBottom && canvasBottom > windowTop;
    $(window).scroll(function (event) {
      var windowTop = $(window).scrollTop(),
        windowBottom = windowTop + window.innerHeight;


      inView = canvasTop < windowBottom && canvasBottom > windowTop;
    });
  });

  var context = canvas.node().getContext("2d");
  options.useForceLayout ? force.on("tick", tick) : d3.timer(tick);

  function tick(e) {
    if (!inView || options.paused)
      return;

    nodes.forEach(function (node) {
      node.collisions = Math.min(node.collisions, 400);
      node.collisions *= options.cooldownFactor;
    });

    var q = d3.geom.quadtree(nodes),
      i,
      d,
      n = nodes.length;

    if (options.useCollisions)
      for (i = 0; i < n; ++i) q.visit(collide(nodes[i]));

    nodes.forEach(function (node) {
      if(node.vx > options.speedOfLight*60) node.vx = options.speedOfLight*60;
      if(node.vx < -options.speedOfLight*60) node.vx = -options.speedOfLight*60;
      if(node.vy > options.speedOfLight*60) node.vy = options.speedOfLight*60;
      if(node.vy < -options.speedOfLight*60) node.vy = -options.speedOfLight*60;
      node.x += node.vx / 60;
      node.y += node.vy / 60;
    });

    nodes.forEach(wrapAround);

    if (isMousedown) {
      moveTowards(mousePosition.x, mousePosition.y);
    }

    ship.direction = (((ship.direction.toDegrees() + 540) % 360) - 180).toRadians()
      //    ship.direction = Math.atan2(ship.vy, ship.vx);
      //    ship.totalSpeed = Math.sqrt(Math.pow(ship.vx, 2) + Math.pow(ship.vy, 2));
    if (ship.totalSpeed > options.speedOfLight) {
      ship.totalSpeed = options.speedOfLight;
    } else if (ship.totalSpeed < 0) {
      ship.totalSpeed = 0;
    }
    ship.vx = Math.cos(ship.direction) * ship.totalSpeed;
    ship.vy = Math.sin(ship.direction) * ship.totalSpeed;

    ship.x += ship.vx;
    ship.y += ship.vy;

    wrapAround(ship);
    render();

  }
  //d3.timer(render);

  function render() {

    context.save();
    context.translate((options.canvasWidth - options.width) / 2, (options.canvasHeight - options.height) / 2);

    var renderNodes = [];

    nodes.forEach(wrapAround);
    nodes.forEach(function (node) {
      renderNodes.push(node);
      var nodeX = options.shipCentered ? (options.width / 2 + (node.x - ship.x)) : node.x;
      var nodeY = options.shipCentered ? (options.height / 2 + (node.y - ship.y)) : node.y;
      if (nodeX - 2 * node.radius < 0)
        renderNodes.push({
          x: options.width + node.x,
          y: node.y,
          collisions: node.collisions,
          radius: node.radius
        });

      if (nodeX + 2 * node.radius > options.width)
        renderNodes.push({
          x: node.x - options.width,
          y: node.y,
          collisions: node.collisions,
          radius: node.radius
        });

      if (nodeY - 2 * node.radius < 0)
        renderNodes.push({
          x: node.x,
          y: options.height + node.y,
          collisions: node.collisions,
          radius: node.radius
        });

      if (nodeY + 2 * node.radius > options.height)
        renderNodes.push({
          x: node.x,
          y: node.y - options.height,
          collisions: node.collisions,
          radius: node.radius
        });

      //Corners
      if (nodeX - 2 * node.radius < 0 && nodeY - 2 * node.radius < 0)
        renderNodes.push({
          x: options.width + node.x,
          y: options.height + node.y,
          collisions: node.collisions,
          radius: node.radius
        });

      if (nodeX - 2 * node.radius < 0 && nodeY + 2 * node.radius > options.height)
        renderNodes.push({
          x: options.width + node.x,
          y: node.y - options.height,
          collisions: node.collisions,
          radius: node.radius
        });

      if (nodeX + 2 * node.radius > options.width && nodeY - 2 * node.radius < 0)
        renderNodes.push({
          x: node.x - options.width,
          y: node.y + options.height,
          collisions: node.collisions,
          radius: node.radius
        });

      if (nodeX + 2 * node.radius > options.width && nodeY + 2 * node.radius > options.height)
        renderNodes.push({
          x: node.x - options.width,
          y: node.y - options.height,
          collisions: node.collisions,
          radius: node.radius
        });
    });

    //  nodes.forEach(wrapAround);
    context.fillStyle = 'black';
    context.fillRect(0, 0, options.width, options.height);
    n = renderNodes.length;
    //    console.log(n);
    for (i = n - 1; i >= 0; --i) {
      d = renderNodes[i];
      var nodeX = options.shipCentered ? (options.width / 2 + (d.x - ship.x)) : d.x;
      var nodeY = options.shipCentered ? (options.height / 2 + (d.y - ship.y)) : d.y;
      context.beginPath();
      context.strokeStyle = "white";
      context.fillStyle = temperature(d.collisions);
      context.moveTo(nodeX, nodeY);
      context.arc(nodeX, nodeY, d.radius, 0, 2 * Math.PI);
      options.outlineParticles && context.stroke();
      context.fill();
    }

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

    wrapAround(asteroid);

    var asteroidX = options.shipCentered ? (options.width / 2 + (asteroid.x - ship.x)) : asteroid.x;
    var asteroidY = options.shipCentered ? (options.height / 2 + (asteroid.y - ship.y)) : asteroid.y;

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
      renderAsteroid(options.width + asteroidX, asteroidY, 0);
    }

    if (asteroidX + 100 > options.width) {
      renderAsteroid(asteroidX - options.width, asteroidY, 0);
    }

    if (asteroidY - 125 < 0) {
      renderAsteroid(asteroidX, options.height + asteroidY, 0);
    }

    if (asteroidY + 125 > options.height) {
      renderAsteroid(asteroidX, asteroidY - options.height, 0);
    }

    // Corners
    if (asteroidX - 100 < 0 && asteroidY - 125 < 0) {
      renderAsteroid(options.width + asteroidX, options.height + asteroidY, 0);
    }

    if (asteroidX - 100 < 0 && asteroidY + 125 > options.height) {
      renderAsteroid(options.width + asteroidX, asteroidY - options.height, 0);
    }

    if (asteroidX + 100 > options.width && asteroidY - 125 < 0) {
      renderAsteroid(asteroidX - options.width, options.height + asteroidY, 0);
    }

    if (asteroidX + 100 > options.width && asteroidY + 125 > options.height) {
      renderAsteroid(asteroidX - options.width, asteroidY - options.height, 0);
    }

    if (options.shipCentered) {
      renderShip(options.width / 2, options.height / 2, ship.direction);
    } else {
      renderShip(ship.x, ship.y, ship.direction);

      if (ship.x - 100 < 0) {
        renderShip(options.width + ship.x, ship.y, ship.direction);
      }

      if (ship.x + 100 > options.width) {
        renderShip(ship.x - options.width, ship.y, ship.direction);
      }

      if (ship.y - 100 < 0) {
        renderShip(ship.x, options.height + ship.y, ship.direction);
      }

      if (ship.y + 100 > options.height) {
        renderShip(ship.x, ship.y - options.height, ship.direction);
      }

      // Corners
      if (ship.x - 100 < 0 && ship.y - 125 < 0) {
        renderAsteroid(options.width + ship.x, options.height + ship.y, 0);
      }

      if (ship.x - 100 < 0 && ship.y + 125 > options.height) {
        renderAsteroid(options.width + ship.x, ship.y - options.height, 0);
      }

      if (ship.x + 100 > options.width && ship.y - 125 < 0) {
        renderAsteroid(ship.x - options.width, options.height + ship.y, 0);
      }

      if (ship.x + 100 > options.width && ship.y + 125 > options.height) {
        renderAsteroid(ship.x - options.width, ship.y - options.height, 0);
      }
    }

    context.restore();
    //  context.translate((innerWidth-options.width)/2,(innerHeight - options.height)/2);
    context.clearRect(0, 0, (options.canvasWidth - options.width) / 2, options.canvasHeight);
    context.clearRect((options.canvasWidth + options.width) / 2, 0, options.canvasWidth, options.canvasHeight);
    context.clearRect(0, 0, options.canvasWidth, (options.canvasHeight - options.height) / 2);
    context.clearRect(0, (options.canvasHeight + options.height) / 2, options.canvasWidth, options.canvasHeight);

    context.strokeStyle = "white";
    context.strokeRect(
      (options.canvasWidth - options.width) / 2, (options.canvasHeight - options.height) / 2,
      options.width, options.height);
  }

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

        if (Math.abs(x) > options.width / 2) x = x > 0 ? x - options.width : x + options.width;
        if (Math.abs(y) > options.height / 2) y = y > 0 ? y - options.height : y + options.height;

        var l = Math.sqrt(x * x + y * y),
          r = node.radius + quad.point.radius;
        if (l < r) {
          l = (l - r) / l * options.collisionForce;
          x = (x * l);
          y = (y * l);
          node.vx -= x;
          node.vy -= y;
          node.collisions++;
          quad.point.vx += x;
          quad.point.vy += y;
          quad.point.collisions++;
        }
      }
      return (x1 > nx2 && x2 < options.width && nx1 > 0) || (x2 < nx1 && nx2 < options.width && x1 > 0) || (y1 > ny2 && y2 < options.height && ny1 > 0) || (y2 < ny1 && ny2 < options.height && y1 > 0);
    };
  }

  return this;
};