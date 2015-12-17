Reveal.initialize({

  dependencies: [
    // Cross-browser shim that fully implements classList - https://github.com/eligrey/classList.js/
    {
      src: 'bower_components/reveal.js/lib/js/classList.js',
      condition: function () {
        return !document.body.classList;
      }
    },

    // Interpret Markdown in <section> elements
    {
      src: 'bower_components/reveal.js/plugin/markdown/marked.js',
      condition: function () {
        return !!document.querySelector('[data-markdown]');
      }
    },
    {
      src: 'bower_components/reveal.js/plugin/markdown/markdown.js',
      condition: function () {
        return !!document.querySelector('[data-markdown]');
      }
    }
  ],

  // Display controls in the bottom right corner
  controls: true,

  // Display a presentation progress bar
  progress: false,

  // Display the page number of the current slide
  slideNumber: false,

  // Push each slide change to the browser history
  history: true,

  // Enable keyboard shortcuts for navigation
  //  keyboard: false,

  // Enable the slide overview mode
  overview: false,

  // Vertical centering of slides
  center: true,

  // Enables touch navigation on devices with touch input
  touch: true,

  // Loop the presentation
  loop: false,

  // Change the presentation direction to be RTL
  rtl: false,

  // Turns fragments on and off globally
  fragments: true,

  // Flags if the presentation is running in an embedded mode,
  // i.e. contained within a limited portion of the screen
  embedded: false,

  // Flags if we should show a help overlay when the questionmark
  // key is pressed
  help: true,

  // Flags if speaker notes should be visible to all viewers
  showNotes: true,

  // Number of milliseconds between automatically proceeding to the
  // next slide, disabled when set to 0, this value can be overwritten
  // by using a data-autoslide attribute on your slides
  autoSlide: 0,

  // Stop auto-sliding after user input
  autoSlideStoppable: false,

  // Enable slide navigation via mouse wheel
  mouseWheel: false,

  // Hides the address bar on mobile devices
  hideAddressBar: true,

  // Opens links in an iframe preview overlay
  previewLinks: false,

  // Transition style
  transition: 'fade', // none/fade/slide/convex/concave/zoom

  // Transition speed
  transitionSpeed: 'fast', // default/fast/slow

  // Transition style for full page slide backgrounds
  backgroundTransition: 'default', // none/fade/slide/convex/concave/zoom

  // Number of slides away from the current that are visible
  viewDistance: 3,

  // Parallax background image
  parallaxBackgroundImage: '', // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

  // Parallax background size
  parallaxBackgroundSize: '', // CSS syntax, e.g. "2100px 900px"

  // Number of pixels to move the parallax background per slide
  // - Calculated automatically unless specified
  // - Set to 0 to disable movement along an axis
  parallaxBackgroundHorizontal: null,
  parallaxBackgroundVertical: null,

  keyboard: {
    65: null,
    83: null
  },
  width: innerWidth,
  height: innerHeight,
  margin: 0

});

var currentAudio = new Audio();
currentAudio.loop = false;
var currentAudioQueue = [];
currentAudio.addEventListener('ended', function(e){
  if(currentAudioQueue.length){
    currentAudio.src = currentAudioQueue[0];
    currentAudio.play();
    currentAudioQueue = currentAudioQueue.slice(1);
  }
});

function queueUp(audioFile){
    if(currentAudio.ended) {
      currentAudio.src = audioFile;
      currentAudio.play();
    } else {
      currentAudioQueue.push(audioFile);
    }
}

$('.mute-button').on('click', function (e) {
  var $icon = $(this).find('i');
  if ($icon.hasClass('fa-volume-up')) {
    $icon.removeClass('fa-volume-up').addClass('fa-volume-off');
    currentAudio.muted = true;
  } else if ($icon.hasClass('fa-volume-off')) {
    $icon.removeClass('fa-volume-off').addClass('fa-volume-up');
    currentAudio.muted = false;
  }
});

var $refreshButton;
function onRevealReady(e) {
  $('aside.controls').append('<button class="fa fa-refresh refresh-button"></button>');
  $refreshButton = $('.refresh-button');
  handleSlideEvent(e);
}

function handleSlideEvent(e) {
  $refreshButton.off('click');
  currentAudio.pause();
  currentAudioQueue = [];
  for (var slide in slideDirectory) {
    if (slide === e.currentSlide.id) {
      var currentSlide = slideDirectory[slide];
      currentSlide.init && currentSlide.init();
      currentSlide.start && currentSlide.start();
      $refreshButton.on('click', function (e) {
        currentSlide.init && currentSlide.init();
        currentSlide.start && currentSlide.start();
      });
    } else {
      slideDirectory[slide].pause();
    }
  }
}

Reveal.addEventListener('ready', onRevealReady);
Reveal.addEventListener('slidechanged', handleSlideEvent);

var slideDirectory = {};

slideDirectory.tutorial = {
  start: function () {
    currentAudio.src = 'audio/tutorial.mp3';
    currentAudio.play();
  },
  pause: function () {
  }
}

slideDirectory.introduction = {
  start: function () {
    currentAudio.src = 'audio/introduction.mp3';
    currentAudio.play();
  },
  pause: function () {
  }
}

slideDirectory.shapesOfTheUniverse = {
  start: function () {
    currentAudio.src = 'audio/shapeOfTheUniverse.mp3';
    currentAudio.play();
  },
  pause: function () {
  }
}

var emptyOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: 400,
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
  shipCentered: false,
  paused: true,
  asteroids: [{
    x: 100,
    y: 200,
    vx: 0,
    vy: 0,
    direction: 0
  }]
};

var emptyUniverse = new RectangularUniverse('#emptyUniverse', emptyOptions);
emptyUniverse.initCallback = function () {
  emptyUniverse.wrapCallback = function () {
    this.wrapCallback = null;
    queueUp('audio/100MeterUniverse2.mp3');
  }.bind(emptyUniverse);
};

slideDirectory.emptyUniverseSlide = {
  start: function(){
    currentAudio.src = 'audio/100MeterUniverse1.mp3';
    currentAudio.play();
    emptyUniverse.init()
  },
  pause: function(){
    emptyUniverse.pause();
  }
};

$(document).on('keydown', function (e) {

  if (e.keyCode === 83) {
    $('.key:eq(2)').addClass('pressed');
  }
  if (e.keyCode === 87) {
    $('.key:eq(0)').addClass('pressed');
  }
  if (e.keyCode === 65) {
    $('.key:eq(1)').addClass('pressed');
  }
  if (e.keyCode === 68) {
    $('.key:eq(3)').addClass('pressed');
  }
})
  .on('keyup', function (e) {
    $('.key').removeClass('pressed');
  });

var centeredOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: 400,
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
  shipCentered: true,
  paused: true,
  asteroids: [{
    x: 100,
    y: 200,
    vx: 0,
    vy: 0,
    direction: 0
  }]
};

var centeredUniverse = new RectangularUniverse('#centeredUniverse', centeredOptions);

slideDirectory.centeredUniverseSlide = {
  start: function(){
    currentAudio.src = 'audio/uncenteredUniverse1.mp3';
    currentAudio.play();
    centeredUniverse.init()
  },
  pause: function(){
    centeredUniverse.pause();
  }
};

slideDirectory.firstReview = {
  start: function () {
    currentAudio.src = 'audio/uncenteredUniverse2.mp3';
    currentAudio.play();
  },
  pause: function () {
  }
}

var expandingEmptyOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: innerWidth,
  canvasHeight: innerHeight,
  width: innerWidth / 4,
  height: innerHeight / 4,
  maxWidth: innerWidth / 2,
  maxHeight: innerHeight / 2,
  startingCount: 0,
  endCount: 0,
  expansionFactor: 1.01,
  additionDelay: 0,
  expansionWait: 5000,
  expansionDelay: 5,
  cooldownFactor: 0.9,
  collisionForce: 0.1,
  useForceLayout: false,
  useCollisions: true,
  outlineParticles: false,
  shipCentered: true,
  paused: true,
  asteroids: [{
    x: innerWidth / 16,
    y: innerHeight / 8,
    vx: 0,
    vy: 0,
    direction: 0
  }]
};

var expandingEmptyUniverse = new RectangularUniverse('#expandingEmptyUniverse', expandingEmptyOptions);

expandingEmptyUniverse.initCallback = function () {
  expandingEmptyOptions.maxWidth = innerWidth / 2;
  expandingEmptyOptions.maxHeight = innerHeight / 2;
  
  expandingEmptyUniverse.expansionCallback = function () {
    this.expansionCallback = null;
    expandingEmptyOptions.maxWidth = innerWidth;
    expandingEmptyOptions.maxHeight = innerHeight;
    expandingEmptyUniverse.timeouts.push(setTimeout(expandingEmptyUniverse.expand, 9000));
  }
  expandingEmptyUniverse.timeouts.push(setTimeout(expandingEmptyUniverse.expand, 15000));
};

slideDirectory.expandingEmptyUniverseSlide = {
  start: function(){
    currentAudio.src = 'audio/expandingUniverse.mp3';
    currentAudio.play();
    expandingEmptyUniverse.init()
  },
  pause: function(){
    expandingEmptyUniverse.pause();
  }
};

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
  shipCentered: true,
  paused: true,
  asteroids: [{
    x: 100,
    y: 200,
    vx: 0,
    vy: 0,
    direction: 0
  }]
};

var sparseUniverse = new RectangularUniverse('#sparseUniverse', sparseOptions);

slideDirectory.sparseUniverseSlide = {
  start: function(){
    currentAudio.src = 'audio/particles.mp3';
    currentAudio.play();
    sparseUniverse.timeouts.push(setTimeout(sparseUniverse.init.bind(sparseUniverse), 6000));
  },
  pause: function(){
    sparseUniverse.pause();
  }
};

var filledOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: innerWidth,
  canvasHeight: innerHeight,
  width: 300,
  height: 300,
  maxWidth: 2 * innerWidth,
  maxHeight: 2 * innerHeight,
  startingCount: 50,
  endCount: 300,
  expansionFactor: 1.01,
  additionDelay: 10,
  expansionWait: 5000,
  expansionDelay: 0,
  cooldownFactor: 0.9,
  collisionForce: 0.1,
  useForceLayout: false,
  useCollisions: true,
  outlineParticles: false,
  shipCentered: true,
  paused: true,
  asteroids: [{
    x: innerWidth / 8,
    y: innerHeight / 4,
    vx: 0,
    vy: 0,
    direction: 0
  }]
};

var filledUniverse = new RectangularUniverse('#filledUniverse', filledOptions);

filledUniverse.initCallback = function () {
  filledUniverse.filledCallback = function () {
    queueUp('audio/hotExpansion2.mp3');
    filledUniverse.timeouts.push(setTimeout(filledUniverse.expand, 7000));
  }
  
  filledUniverse.expansionCallback = function(){
    queueUp('audio/hotExpansion3.mp3');
  }
  
  filledUniverse.timeouts.push(setTimeout(filledUniverse.addOne, 1000));
};

slideDirectory.filledUniverseSlide = {
  start: function(){
    currentAudio.src = 'audio/hotExpansion1.mp3';
    currentAudio.play();
    filledUniverse.init();
  },
  pause: function(){
    filledUniverse.pause();
  }
};

var bigBangOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: innerWidth,
  canvasHeight: innerHeight,
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
  shipCentered: true,
  paused: true,
  asteroids: []
};

var bigBangUniverse = new RectangularUniverse('#bigBangUniverse', bigBangOptions);

bigBangUniverse.initCallback = function () {
    bigBangUniverse.expand();
};


slideDirectory.bigBangUniverseSlide = bigBangUniverse;

var globeOptions = {
  speedOfLight: 200,
  thrust: 5,
  width: innerWidth,
  height: innerHeight,
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
  projection: 'Globe',
  shipCentered: true,
  paused: true
};

var globeUniverse = new SphericalUniverse('#globeUniverse', globeOptions);

slideDirectory.globeUniverseSlide = {
  start: function(){
    currentAudio.src = 'audio/globeUniverse.mp3';
    currentAudio.play();
    globeUniverse.timeouts.push(setTimeout(globeUniverse.init.bind(globeUniverse), 22000));
  },
  pause: function(){
    globeUniverse.pause();
  }
};

var flatCircleOptions = {
  speedOfLight: 200,
  thrust: 5,
  width: innerWidth,
  height: innerHeight,
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
  projection: 'Azimuthal Equidistant',
  shipCentered: true,
  paused: true
};

var flatCircleUniverse = new SphericalUniverse('#flatCircleUniverse', flatCircleOptions);

slideDirectory.flatCircleUniverseSlide = {
  start: function(){
    currentAudio.src = 'audio/flatCircle.mp3';
    currentAudio.play();
    flatCircleUniverse.timeouts.push(setTimeout(flatCircleUniverse.init.bind(flatCircleUniverse), 8000));
  },
  pause: function(){
    flatCircleUniverse.pause();
  }
};

var expandingSphereOptions = {
  speedOfLight: 200,
  thrust: 5,
  width: innerWidth,
  height: innerHeight,
  startingCount: 100,
  endCount: 150,
  expansionFactor: 1.01,
  additionDelay: 5,
  expansionWait: 5000,
  expansionDelay: 0,
  maxExpansion: 7,
  cooldownFactor: 0.9,
  collisionForce: 0.1,
  useForceLayout: false,
  useCollisions: true,
  outlineParticles: false,
  renderGraticules: false,
  renderPlanet: false,
  projection: 'Azimuthal Equidistant',
  shipCentered: true,
  paused: true
};

var expandingSphereUniverse = new SphericalUniverse('#expandingSphereUniverse', expandingSphereOptions);

expandingSphereUniverse.initCallback = function () {
  expandingSphereUniverse.filledCallback = function () {
    expandingSphereUniverse.timeouts.push(setTimeout(expandingSphereUniverse.expand, 5000));
  };
  
  expandingSphereUniverse.expansionCallback = function(){
    queueUp('audio/expandingCircle2.mp3');
  };

  expandingSphereUniverse.timeouts.push(setTimeout(expandingSphereUniverse.addOne.bind(expandingSphereUniverse), 5000));
};

slideDirectory.expandingSphereUniverseSlide = {
  start: function(){
    currentAudio.src = 'audio/expandingCircle1.mp3';
    currentAudio.play();
    expandingSphereUniverse.init();
  },
  pause: function(){
    expandingSphereUniverse.pause();
  }
};

slideDirectory.secondReview = {
  start: function () {
    currentAudio.src = 'audio/infinite1.mp3';
    currentAudio.play();
  },
  pause: function () {
  }
};

slideDirectory.infiniteMath = {
  start: function () {
    currentAudio.src = 'audio/infinite2.mp3';
    currentAudio.play();
  },
  pause: function () {
  }
};

var infiniteOptions = {
  speedOfLight: 10,
  thrust: 1,
  canvasWidth: innerWidth,
  canvasHeight: innerHeight,
  width: innerWidth,
  height: innerHeight,
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
  shipCentered: true,
  paused: true,
  asteroids: [],
  initialCollisions: 1000
};

var infiniteUniverse = new RectangularUniverse('#infiniteUniverse', infiniteOptions);

infiniteUniverse.initCallback = function () {
   infiniteUniverse.timeouts.push(setTimeout(infiniteUniverse.expand, 5000));
};

slideDirectory.infiniteUniverseSlide = {
  start: function(){
    currentAudio.src = 'audio/infinite3.mp3';
    currentAudio.play();
    infiniteUniverse.init();
  },
  pause: function(){
    infiniteUniverse.pause();
  }
};

slideDirectory.corrections = {
  start: function () {
    currentAudio.src = 'audio/corrections.mp3';
    currentAudio.play();
  },
  pause: function () {
  }
};

slideDirectory.credits = {
  start: function () {
    currentAudio.src = 'audio/credits.mp3';
    currentAudio.play();
  },
  pause: function () {
  }
};