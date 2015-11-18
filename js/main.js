var width = innerWidth / 3,
  height = innerHeight / 3;

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
  .domain([0, 100, 200, 300])
  .range(['black', 'red', 'orange', 'white']);
//  .range(['rgba(0,0,0,' + opacity + ')', 'rgba(255,0,0,' + opacity + ')', 'rgba(255,165,0,' + opacity + ')', 'rgba(255,255,255,' + opacity + ')']);


var nodes = d3.range(100)
      .map(function(i) { 
        return {
          color: color(i),
          collisions: 0,
          radius: Math.random() * 3 + 13
        }; 
      }),
    root = nodes[0];

root.x = width / 2;
root.y = height / 2;
root.radius = 0;
root.fixed = true;

var force = d3.layout.force()
    .gravity(0)
    .charge(function(d, i) { return i ? 0 : -10;})
    .nodes(nodes)
    .size([width, height]);

force.start();

!function addOne(){
  nodes.push({color: color(nodes.length), collisions: 0, radius: Math.random() * 3 + 13});
  force.nodes(nodes);
  force.start();
  
  if(nodes.length < 750)
    setTimeout(addOne, 20);
  else 
    setTimeout(bigger, 50);
}()

function bigger() {
  var scaleFactor = 1.005;
  width *= scaleFactor;
  height *= scaleFactor;
  
  canvas
    .attr("width", width)
    .attr("height", height);
  
  nodes.forEach(function(node) {
    node.px = node.x *= scaleFactor;
    node.py = node.y *= scaleFactor;
  });
  
  force
    .size([width, height])
    .start();

  if(width < innerWidth && height < innerHeight)
    setTimeout(bigger, 50);
}



var canvas = d3.select("body").append("canvas")
    .attr("width", width)
    .attr("height", height);

var context = canvas.node().getContext("2d");
force.on("tick", function (e) {
  nodes.forEach(function(node){
    node.collisions = Math.min(node.collisions, 400);
    node.collisions *= 0.9;
  });
  
  nodes.forEach(wrapAround);

  var q = d3.geom.quadtree(nodes),
    i,
    d,
    n = nodes.length;

  for (i = 1; i < n; ++i) q.visit(collide(nodes[i]));


//  nodes.forEach(wrapAround);

  context.clearRect(0, 0, width, height);
  
  for (i = n-1; i >=0; --i) {
    d = nodes[i];
    context.beginPath();
    context.strokeStyle = "white";
    context.fillStyle = temperature(d.collisions);
    context.moveTo(d.x, d.y);
    context.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
    context.stroke();
    context.fill();
  }
});

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
      
      if(Math.abs(x) > width / 2) x = -(width - x);
      if(Math.abs(y) > height / 2) y = -(height - y);
      
        l = Math.sqrt(x * x + y * y),
        r = node.radius + quad.point.radius;
      if (l < r) {
        l = (l - r) / l * .1;
        x = (x*l);
        y = (y*l);
        node.x -= x;
        node.y -= y;
        node.collisions++;
        quad.point.x += x;
        quad.point.y += y;
        quad.point.collisions++;
      }
    }
    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
  };
}