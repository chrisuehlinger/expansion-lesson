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
    },
    // MathJax
    { src: 'bower_components/reveal.js/plugin/math/math.js', async: true }
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
var readyToAdvance = true;
currentAudio.addEventListener('ended', function (e) {
  if (currentAudioQueue.length) {
    currentAudio.src = currentAudioQueue[0];
    currentAudio.play();
    currentAudioQueue = currentAudioQueue.slice(1);
  } else if (readyToAdvance) {
    $nextControl.addClass('ready-to-advance');
  }
});

function queueUp(audioFile) {
  if (currentAudio.paused || currentAudio.ended) {
    currentAudio.src = audioFile;
    currentAudio.play();
  } else {
    currentAudioQueue.push(audioFile);
  }
}

var $muteSwitch = $('.mute-button');

// Check if we can control the volume
var oldVolume = currentAudio.volume;
if (oldVolume === 0) {
  currentAudio.volume += 0.00001;
} else {
  currentAudio.volume -= 0.00001;
}

var canChangeVolume = (oldVolume !== currentAudio.volume);
if (canChangeVolume)
  $muteSwitch.on('click', function (e) {
    var $icon = $(this).find('i');
    if ($icon.hasClass('fa-volume-up')) {
      $icon.removeClass('fa-volume-up').addClass('fa-volume-off');
      currentAudio.muted = true;
    } else if ($icon.hasClass('fa-volume-off')) {
      $icon.removeClass('fa-volume-off').addClass('fa-volume-up');
      currentAudio.muted = false;
    }
  });
else
  $muteSwitch.hide();

var $refreshButton, $nextControl;
function onRevealReady(e) {
  $nextControl = $('.navigate-right');

  $('aside.controls').append('<button class="fa fa-refresh refresh-button"></button>');
  $refreshButton = $('.refresh-button');

  handleSlideEvent(e);
}

function handleSlideEvent(e) {
  $nextControl.removeClass('ready-to-advance');
  $refreshButton.off('click');
  currentAudio.pause();
  currentAudioQueue = [];
  readyToAdvance = true;
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

var introTimeouts = [];
slideDirectory.introduction = {
  start: function () {

    var delay = 2800,
      $img = $('.introduction-diagrams img'),
      $hands = $('.introduction-diagrams i.edge-hand'),
      $testParticle = $('.introduction-diagrams i.test-particle');

    $hands.stop(true, true).hide();
    $img.stop(true, true).hide();
    $testParticle.stop(true, true).hide();

    introTimeouts.forEach(clearTimeout);
    introTimeouts = [];

    show0();

    function show0() {
      $img.eq(0).fadeIn(delay, hide0);
    }

    function hide0() {
      introTimeouts.push(setTimeout(function () { $img.eq(0).fadeOut(delay, show1); }, delay));
    }

    function show1() {
      introTimeouts.push(setTimeout(function () { $img.eq(1).fadeIn(delay, hide1); }));
    }

    function hide1() {
      introTimeouts.push(setTimeout(function () { $img.eq(1).fadeOut(delay, show2); }));
    }

    function show2() {
      introTimeouts.push(setTimeout(function () { $img.eq(2).fadeIn(delay, hide2); }));
    }

    function hide2() {
      introTimeouts.push(setTimeout(function () { $img.eq(2).fadeOut(delay, show3); }));
    }

    function show3() {
      introTimeouts.push(setTimeout(function () { $img.eq(3).fadeIn(delay, hide3); }));
    }

    function hide3() {
      introTimeouts.push(setTimeout(function () { $img.eq(3).fadeOut(delay, show4); }, delay));
    }

    function show4() {
      introTimeouts.push(setTimeout(function () { $img.eq(4).fadeIn(delay, funnyStuff); }));
    }

    function funnyStuff() {
      $hands.show();
      introTimeouts.push(setTimeout(hide4, delay));
    }

    function hide4() {
      introTimeouts.push(setTimeout(function () { $hands.hide(); $img.eq(4).fadeOut(delay, show5); }, delay));
    }

    function show5() {
      introTimeouts.push(setTimeout(function () { $img.eq(5).fadeIn(delay / 4, hide5); }));
    }

    function hide5() {
      introTimeouts.push(setTimeout(function () { $img.eq(5).fadeOut(delay / 4, show6); }, delay / 4));
    }

    function show6() {
      introTimeouts.push(setTimeout(function () { $img.eq(6).fadeIn(delay / 2, hide6); }));
    }

    function hide6() {
      introTimeouts.push(setTimeout(function () { $img.eq(6).fadeOut(delay / 2, showQuestion); }, delay / 2));
    }

    function showQuestion() {
      introTimeouts.push(setTimeout(function () {
        $img.eq(3).fadeIn(delay / 2, function () {
          $testParticle.addClass('go').fadeIn(100, function () {
            introTimeouts.push(setTimeout(function () {
              $testParticle.fadeOut(delay, function () {
                $testParticle.removeClass('go');
              });
              $img.eq(3).fadeOut(delay);
            }, 15000));
          });
        });
      }, 12000));
    }


    queueUp('audio/introduction.mp3');

  },
  pause: function () {
    // $hands.stop(true,true).hide();
    // $img.stop(true,true).hide();
    // $testParticle.stop(true,true).hide();
    introTimeouts.forEach(clearTimeout);
  }
}

slideDirectory.shapesOfTheUniverse = {
  timeouts: [],
  start: function () {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];

    queueUp('audio/shapeOfTheUniverse.mp3');

    var $img = $('.possible-shapes img');
    $img.removeClass('pulse');

    this.timeouts.push(setTimeout(function () { $img.eq(0).addClass('pulse'); }, 5000));
    this.timeouts.push(setTimeout(function () { $img.eq(1).addClass('pulse'); }, 6000));
    this.timeouts.push(setTimeout(function () { $img.eq(2).addClass('pulse'); }, 7000));

    this.timeouts.push(setTimeout(function () { $img.removeClass('pulse'); }, 9000));

    this.timeouts.push(setTimeout(function () { $img.eq(0).addClass('pulse'); }, 10000));
    this.timeouts.push(setTimeout(function () { $img.eq(1).addClass('pulse'); }, 15000));
    this.timeouts.push(setTimeout(function () { $img.eq(2).addClass('pulse'); }, 19000));

  },
  pause: function () {
    var $img = $('.possible-shapes img');
    $img.removeClass('pulse');
    this.timeouts.forEach(clearTimeout);
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
    readyToAdvance = true;
  }.bind(emptyUniverse);
};

slideDirectory.emptyUniverseSlide = {
  start: function () {
    queueUp('audio/100MeterUniverse1.mp3');
    readyToAdvance = false;
    emptyUniverse.init()
  },
  pause: function () {
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
  start: function () {
    queueUp('audio/uncenteredUniverse1.mp3');
    centeredUniverse.init()
  },
  pause: function () {
    centeredUniverse.pause();
  }
};

slideDirectory.firstReview = {
  timeouts: [],
  start: function () {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];

    var $li = $('#firstReview li');
    $li.hide();

    queueUp('audio/uncenteredUniverse2.mp3');

    this.timeouts.push(setTimeout(function () { $li.eq(0).fadeIn(1000); }, 3000));
    this.timeouts.push(setTimeout(function () { $li.eq(1).fadeIn(1000); }, 7000));
    this.timeouts.push(setTimeout(function () { $li.eq(2).fadeIn(1000); }, 14000));

  },
  pause: function () {
    this.timeouts.forEach(clearTimeout);
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
    x: 0.75 * innerWidth / 16,
    y: 0.75 * innerHeight / 8,
    vx: 0,
    vy: 0,
    direction: 0
  }, {
      x: 3.5 * innerWidth / 16,
      y: innerHeight / 8,
      vx: 0,
      vy: 0,
      direction: 0
    }, {
      x: 1.5 * innerWidth / 16,
      y: 1.5 * innerHeight / 8,
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
  start: function () {
    queueUp('audio/expandingUniverse.mp3');
    expandingEmptyUniverse.init()
  },
  pause: function () {
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
  start: function () {
    queueUp('audio/particles.mp3');
    sparseUniverse.timeouts.push(setTimeout(sparseUniverse.init.bind(sparseUniverse), 6000));
  },
  pause: function () {
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

  filledUniverse.expansionCallback = function () {
    queueUp('audio/hotExpansion3.mp3');
    readyToAdvance = true;

  }

  filledUniverse.timeouts.push(setTimeout(filledUniverse.addOne, 1000));
};

slideDirectory.filledUniverseSlide = {
  start: function () {
    queueUp('audio/hotExpansion1.mp3');
    readyToAdvance = false;
    filledUniverse.init();
  },
  pause: function () {
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
  maxWidth: innerWidth / 2,
  maxHeight: innerHeight / 2,
  startingCount: 300,
  endCount: 300,
  expansionFactor: 1.3,
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

slideDirectory.bigBangUniverseSlide = {
  start: function () {
    queueUp('audio/bigBang.mp3');
    bigBangOptions.maxWidth = innerWidth / 2;
    bigBangOptions.maxHeight = innerHeight / 2;
    bigBangOptions.expansionFactor = 1.1;
    
    

    bigBangUniverse.expansionCallback = function(){
      bigBangUniverse.expansionCallback = null;
      bigBangOptions.maxWidth = innerWidth * 2;
      bigBangOptions.maxHeight = innerHeight * 2;
      bigBangOptions.expansionFactor = 1.01;
      bigBangUniverse.expand();
    }
    
    bigBangUniverse.timeouts.push(setTimeout(bigBangUniverse.init.bind(bigBangUniverse), 7000));
  },
  pause: function () {
    bigBangUniverse.pause();
  }
};

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
  start: function () {
    queueUp('audio/globeUniverse.mp3');
    globeUniverse.timeouts.push(setTimeout(globeUniverse.init.bind(globeUniverse), 22000));
  },
  pause: function () {
    globeUniverse.pause();
  }
};

var flatCircleOptions = {
  speedOfLight: 200,
  thrust: 5,
  width: innerWidth,
  height: innerHeight * 3 / 4,
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
  start: function () {
    var $link = $('#flatCircleUniverseSlide a');
    $link.hide();

    queueUp('audio/flatCircle.mp3');

    flatCircleUniverse.timeouts.push(setTimeout(flatCircleUniverse.init.bind(flatCircleUniverse), 8000));

    flatCircleUniverse.initCallback = function () {
      flatCircleUniverse.timeouts.push(setTimeout(function () { $link.fadeIn(1000); }, 25000));
    }


  },
  pause: function () {
    flatCircleUniverse.pause();
  }
};

var expandingSphereOptions = {
  speedOfLight: 200,
  thrust: 5,
  width: innerWidth,
  height: innerHeight,
  startingCount: 50,
  endCount: 100,
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
  renderGraticules: true,
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

  expandingSphereUniverse.expansionCallback = function () {
    queueUp('audio/expandingCircle2.mp3');
    readyToAdvance = true;
  };

  expandingSphereUniverse.timeouts.push(setTimeout(expandingSphereUniverse.addOne.bind(expandingSphereUniverse), 5000));
};

slideDirectory.expandingSphereUniverseSlide = {
  start: function () {
    queueUp('audio/expandingCircle1.mp3');
    readyToAdvance = false;
    expandingSphereUniverse.init();
  },
  pause: function () {
    expandingSphereUniverse.pause();
  }
};

slideDirectory.secondReview = {
  timeouts: [],
  start: function () {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];

    var $li = $('#secondReview li'), $img = $('#secondReview img');
    $li.hide();
    $img.removeClass('pulse');

    queueUp('audio/infinite1.mp3');

    this.timeouts.push(setTimeout(function () { $img.eq(0).addClass('pulse'); }, 2000));
    this.timeouts.push(setTimeout(function () { $img.eq(1).addClass('pulse'); }, 4000));

    this.timeouts.push(setTimeout(function () { $li.eq(0).fadeIn(1000); }, 25000));
    this.timeouts.push(setTimeout(function () { $li.eq(1).fadeIn(1000); }, 29000));
    this.timeouts.push(setTimeout(function () { $li.eq(2).fadeIn(1000); }, 33000));

  },
  pause: function () {
    this.timeouts.forEach(clearTimeout);
  }
};

slideDirectory.infiniteMath = {
  timeouts: [],
  start: function () {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
    
    var $equations = $('.math-row div'), $link = $('#infiniteMath a');
    $link.hide();
    $equations.css("visibility", "hidden");
    
    queueUp('audio/infinite2.mp3');
    
    this.timeouts.push(setTimeout(function () { $equations.eq(0).hide().css("visibility", "visible").fadeIn(1000); }, 25000));
    this.timeouts.push(setTimeout(function () { $equations.eq(1).hide().css("visibility", "visible").fadeIn(1000); }, 35000));
    this.timeouts.push(setTimeout(function () { $equations.eq(2).hide().css("visibility", "visible").fadeIn(1000); }, 45000));
    this.timeouts.push(setTimeout(function () { $equations.eq(3).hide().css("visibility", "visible").fadeIn(1000); }, 50000));
    this.timeouts.push(setTimeout(function () { $equations.eq(4).hide().css("visibility", "visible").fadeIn(1000); }, 55000));
    this.timeouts.push(setTimeout(function () { $link.fadeIn(1000); }, 70000));
    
  },
  pause: function () {
    this.timeouts.forEach(clearTimeout);
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
  start: function () {
    queueUp('audio/infinite3.mp3');
    infiniteUniverse.init();
  },
  pause: function () {
    infiniteUniverse.pause();
  }
};

slideDirectory.corrections = {
  timeouts: [],
  start: function () {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];

    var $li = $('#corrections li');
    $li.hide();

    queueUp('audio/corrections.mp3');

    this.timeouts.push(setTimeout(function () { $li.eq(0).fadeIn(1000); }, 11000));
    this.timeouts.push(setTimeout(function () { $li.eq(1).fadeIn(1000); }, 17000));
    this.timeouts.push(setTimeout(function () { $li.eq(2).fadeIn(1000); }, 31000));
    this.timeouts.push(setTimeout(function () { $li.eq(3).fadeIn(1000); }, 45000));
    this.timeouts.push(setTimeout(function () { $li.eq(4).fadeIn(1000); }, 55000));

  },
  pause: function () {
    this.timeouts.forEach(clearTimeout);
  }
};

slideDirectory.credits = {
  start: function () {
    queueUp('audio/credits.mp3');
  },
  pause: function () {
  }
};