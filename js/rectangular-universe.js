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

  var ship, nodes, canvas = d3.select(canvasSelector)
    .attr("width", options.canvasWidth)
    .attr("height", options.canvasHeight);

  var initialWidth = options.width,
    initialHeight = options.height,
    initialAsteroids = _.cloneDeep(options.asteroids);

  this.timeouts = [];
  this.init = function () {
    this.timeouts.forEach(clearTimeout);
    setTimeout(getOffsets);
    options.width = initialWidth;
    options.height = initialHeight;
    options.asteroids = _.cloneDeep(initialAsteroids);
    ship = {
      x: options.width / 2,
      y: options.height / 2,
      vx: 0,
      vy: 0,
      direction: 0,
      totalSpeed: 0,
      totalDistanceTraveled: 0
    };

    nodes = d3.range(options.startingCount)
      .map(createNode);

    this.initCallback && this.initCallback();
    options.paused = false;
  }
  options.paused = true;

  function createNode() {
    return {
      collisions: options.initialCollisions || 0,
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
    var didWrap = false;

    if (node.x < 0) {
      didWrap = true;
      node.x = options.width + node.x;
    } else if (node.x > options.width) {
      didWrap = true;
      node.x -= options.width;
    }
    node.px = node.x;

    if (node.y < 0) {
      didWrap = true;
      node.y = options.height + node.y;
    } else if (node.y > options.height) {
      didWrap = true;
      node.y -= options.height;
    }
    node.py = node.y;

    return didWrap;
  }

  this.addOne = function () {
    if (!inView || options.paused)
      return this.timeouts.push(setTimeout(this.addOne, options.additionDelay));

    if (nodes.length < options.endCount) {
      nodes.push(createNode());
      this.timeouts.push(setTimeout(this.addOne, options.additionDelay));
    } else {
      this.filledCallback && this.timeouts.push(setTimeout(this.filledCallback));
    }
  }.bind(this);

  this.expand = function () {
    if (!inView || options.paused)
      return this.timeouts.push(setTimeout(this.expand, options.expansionDelay));

    if (options.width < options.maxWidth && options.height < options.maxHeight) {
      options.width *= options.expansionFactor;
      options.height *= options.expansionFactor;

      nodes.forEach(function (node) {
        node.x *= options.expansionFactor;
        node.y *= options.expansionFactor;
      });

      ship.x *= options.expansionFactor;
      ship.y *= options.expansionFactor;

      options.asteroids.forEach(function (asteroid) {
        asteroid.x *= options.expansionFactor;
        asteroid.y *= options.expansionFactor;
      });

      this.timeouts.push(setTimeout(this.expand, options.expansionDelay));
    } else {
      this.expansionCallback && this.timeouts.push(setTimeout(this.expansionCallback));
    }
  }.bind(this);



  var isMousedown = false,
    isTouching = false,
    mousePosition = {
      x: 0,
      y: 0
    };
  $(canvasSelector).on('mousedown', function (e) {
    isMousedown = true;
    console.log(e);
    mousePosition = {
      x: (e.offsetX || e.pageX - $(e.target).offset().left),
      y: (e.offsetY || e.pageY - $(e.target).offset().top)
    };
    $(this)
      .on('mousemove', function (e) {
        mousePosition = {
          x: (e.offsetX || e.pageX - $(e.target).offset().left),
          y: (e.offsetY || e.pageY - $(e.target).offset().top)
        };

      })
      .on('mouseup', function (e) {
        $(this).off('mousemove mouseup');
        isMousedown = false;
      });
  });


  $(canvasSelector).on('touchstart', function (e) {
    isMousedown = true;
    isTouching = true;
    e.preventDefault();
    console.log($(canvasSelector)[0].pageY, e.originalEvent.changedTouches[0].pageY, e.originalEvent.changedTouches[0].pageY - $(canvasSelector)[0].pageY);

    var totalOffsetY = 0;
    var curElement = $(canvasSelector)[0];
    do {
      totalOffsetY += curElement.offsetTop;
    } while (curElement = curElement.offsetParent)

    mousePosition = {
      x: e.originalEvent.changedTouches[0].pageX - canvasLeft,
      y: e.originalEvent.changedTouches[0].pageY - totalOffsetY
    };
    $(this)
      .on('touchmove', function (e) {
        var totalOffsetY = 0;
        var curElement = $(canvasSelector)[0];
        do {
          totalOffsetY += curElement.offsetTop;
        } while (curElement = curElement.offsetParent)

        mousePosition = {
          x: e.originalEvent.changedTouches[0].pageX - canvasLeft,
          y: e.originalEvent.changedTouches[0].pageY - totalOffsetY
        };

      })
      .on('touchend touchcancel', function (e) {
        $(this).off('touchmove touchend touchcancel');
        isMousedown = false;

        setTimeout(function () { isTouching = false; }, 100);
      });

  });

  function moveTowards(x, y) {
    // console.log(x, y);
    var dx, dy;
    if (options.shipCentered) {
      dx = x - options.canvasWidth / 2;
      dy = y - options.canvasHeight / 2;
    } else {
      dx = x - (ship.x + Math.max(0, (options.canvasWidth - options.width) / 2));
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

  this.pause = function () {
    options.paused = true;
  }

  this.unpause = function () {
    options.paused = false;
  }

  var canvasTop, canvasBottom, canvasLeft, inView = false;
  setTimeout(getOffsets);
  function getOffsets() {
    var windowTop = $(window).scrollTop(),
      windowBottom = windowTop + $(window).height();

    var curElement = $(canvasSelector)[0];
    canvasLeft = canvasTop = 0;
    do {
      canvasLeft += curElement.offsetLeft;
      canvasTop += curElement.offsetTop;
    } while (curElement = curElement.offsetParent)
    canvasBottom = canvasTop + options.canvasHeight;
    
    inView = canvasTop < windowBottom && canvasBottom > windowTop;
    $(window).scroll(function (event) {
      var windowTop = $(window).scrollTop(),
        windowBottom = windowTop + window.innerHeight;


      inView = canvasTop < windowBottom && canvasBottom > windowTop;
    });
  };

  var context = canvas.node().getContext("2d");
  d3.timer(tick.bind(this));

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
      if (node.vx > options.speedOfLight * 60) node.vx = options.speedOfLight * 60;
      if (node.vx < -options.speedOfLight * 60) node.vx = -options.speedOfLight * 60;
      if (node.vy > options.speedOfLight * 60) node.vy = options.speedOfLight * 60;
      if (node.vy < -options.speedOfLight * 60) node.vy = -options.speedOfLight * 60;
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
    ship.totalDistanceTraveled += ship.totalSpeed;

    if (this.triggerDistance && ship.totalDistanceTraveled > this.triggerDistance) {
      this.distanceCallback && this.timeouts.push(setTimeout(this.distanceCallback));
    }

    var didWrap = wrapAround(ship);
    if (didWrap) {
      this.wrapCallback && this.timeouts.push(setTimeout(this.wrapCallback))
    }

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
      shipHasLoaded && context.drawImage(shipImg, x, y);
      context.fill();
      context.restore();
    }

    options.asteroids.forEach(function (asteroid) {

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
        asteroidHasLoaded && context.drawImage(asteroidImg, x, y);
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

    });

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
        renderShip(options.width + ship.x, options.height + ship.y, 0);
      }

      if (ship.x - 100 < 0 && ship.y + 125 > options.height) {
        renderShip(options.width + ship.x, ship.y - options.height, 0);
      }

      if (ship.x + 100 > options.width && ship.y - 125 < 0) {
        renderShip(ship.x - options.width, options.height + ship.y, 0);
      }

      if (ship.x + 100 > options.width && ship.y + 125 > options.height) {
        renderShip(ship.x - options.width, ship.y - options.height, 0);
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