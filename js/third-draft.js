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
  // width: innerWidth,
  // height: innerHeight,
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


var audioLoadFunction = function () { };
function whenAudioLoads(callback) {
  audioLoadFunction = function (e) {
    currentAudio.removeEventListener('canplay', audioLoadFunction);
    callback();
  };
  currentAudio.addEventListener('canplay', audioLoadFunction);
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
  currentAudio.removeEventListener('canplay', audioLoadFunction);
  readyToAdvance = true;
  for (var slide in slideDirectory) {
    if (slide === e.currentSlide.id) {
      var currentSlide = slideDirectory[slide];
      currentSlide.init && currentSlide.init();
      currentSlide.start && currentSlide.start();
      $refreshButton.on('click', function (e) {
        currentAudio.pause();
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



var introRectangularOptions = {
  speedOfLight: 5,
  thrust: 1,
  canvasWidth: 300,
  canvasHeight: 300,
  width: 300,
  height: 300,
  maxWidth: 300,
  maxHeight: 300,
  startingCount: 50,
  endCount: 0,
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
  alwaysInView: true,
  ship: {
    x: 300 / 2,
    y: 300 / 2,
    vx: 0,
    vy: 0,
    direction: Math.PI/2,
    totalSpeed: 6,
    totalDistanceTraveled: 0
  },
  asteroids:[] /*[{
    x: 100,
    y: 200,
    vx: 0,
    vy: 0,
    direction: 0
  }]*/
};

var introRectangularUniverse = new RectangularUniverse('#introRectangularUniverse', introRectangularOptions);

var introSphericalOptions = {
  speedOfLight: 50,
  thrust: 5,
  width: 400,
  height: 400,
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
  paused: true,
  startingExpansion: 0.75
};

var introSphericalUniverse = new SphericalUniverse('#introSphericalUniverse', introSphericalOptions);

slideDirectory.titleSlide = {
  start: function () {
    setTimeout(function(){introRectangularUniverse.init();}, 500)
    introSphericalUniverse.init();
  },
  pause: function () {
    introRectangularUniverse.pause();
    introSphericalUniverse.pause();
  }
};

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

    var delay = 3200,
      $img = $('.introduction-diagrams img'),
      $hands = $('.introduction-diagrams i.edge-hand'),
      $testParticle = $('.introduction-diagrams i.test-particle'),
      $games = $('.game-logos img');

    $hands.stop(true, true).hide();
    $img.stop(true, true).hide();
    $testParticle.stop(true, true).hide();
    $games.stop(true, true).hide();

    introTimeouts.forEach(clearTimeout);
    introTimeouts = [];

    whenAudioLoads(show0);

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
              $img.eq(3).fadeOut(delay, show7);
            }, 15000));
          });
        });
      }, 10000));
    }

    function show7() {
      introTimeouts.push(setTimeout(function () { $games.eq(0).fadeIn(delay/4, show8); }, 22000));
    }

    function show8() {
      introTimeouts.push(setTimeout(function () { $games.eq(1).fadeIn(delay/4, show9); }));
    }

    function show9() {
      introTimeouts.push(setTimeout(function () { $games.eq(2).fadeIn(delay/4); $games.eq(3).fadeIn(delay/4); }));
    }


    queueUp('audio/introduction.mp3');

  },
  pause: function () {
    // $hands.stop(true,true).hide();
    // $img.stop(true,true).hide();
    // $testParticle.stop(true,true).hide();
    introTimeouts.forEach(clearTimeout);
  }
};

slideDirectory.shapesOfTheUniverse = {
  timeouts: [],
  start: function () {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];

    var $img = $('.possible-shapes img');
    $img.removeClass('pulse');

    whenAudioLoads(function () {
      this.timeouts.push(setTimeout(function () { $img.eq(0).addClass('pulse'); }, 4500));
      this.timeouts.push(setTimeout(function () { $img.eq(1).addClass('pulse'); }, 5500));
      this.timeouts.push(setTimeout(function () { $img.eq(2).addClass('pulse'); }, 6500));

      this.timeouts.push(setTimeout(function () { $img.removeClass('pulse'); }, 8400));

      this.timeouts.push(setTimeout(function () { $img.eq(0).addClass('pulse'); }, 8500));
      this.timeouts.push(setTimeout(function () { $img.eq(1).addClass('pulse'); $img.eq(2).addClass('pulse'); }, 12000));
      
      this.timeouts.push(setTimeout(function () { $img.removeClass('pulse'); }, 15000));
      
      this.timeouts.push(setTimeout(function () { $img.eq(1).addClass('pulse'); }, 25500));
      this.timeouts.push(setTimeout(function () { $img.eq(0).addClass('pulse'); }, 30000));
    //   this.timeouts.push(setTimeout(function () {  }, 19000));
    }.bind(this));

    queueUp('audio/shapeOfTheUniverse.mp3');
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
    emptyUniverse.init();
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
    whenAudioLoads(centeredUniverse.init.bind(centeredUniverse));
    queueUp('audio/uncenteredUniverse1.mp3');
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
    $li.css("visibility", "hidden");

    whenAudioLoads(function () {
      this.timeouts.push(setTimeout(function () { $li.eq(0).hide().css("visibility", "visible").fadeIn(1000); }, 3000));
      this.timeouts.push(setTimeout(function () { $li.eq(1).hide().css("visibility", "visible").fadeIn(1000); }, 7000));
      this.timeouts.push(setTimeout(function () { $li.eq(2).hide().css("visibility", "visible").fadeIn(1000); }, 14000));
    }.bind(this));

    queueUp('audio/uncenteredUniverse2.mp3');
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
  asteroids: [
    {
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
    }
  ]
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
    whenAudioLoads(expandingEmptyUniverse.init.bind(expandingEmptyUniverse));
    queueUp('audio/expandingUniverse.mp3');
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
    whenAudioLoads(function () {
      sparseUniverse.timeouts.push(setTimeout(sparseUniverse.init.bind(sparseUniverse), 5000));
    });
    queueUp('audio/particles.mp3');
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
    readyToAdvance = false;
    whenAudioLoads(filledUniverse.init.bind(filledUniverse));
    queueUp('audio/hotExpansion1.mp3');
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
    $('#bigBangUniverse').css('visibility', 'hidden');
    bigBangOptions.maxWidth = innerWidth / 2;
    bigBangOptions.maxHeight = innerHeight / 2;
    bigBangOptions.expansionFactor = 1.1;

    bigBangUniverse.expansionCallback = function () {
      bigBangUniverse.expansionCallback = null;
      bigBangOptions.maxWidth = innerWidth * 2;
      bigBangOptions.maxHeight = innerHeight * 2;
      bigBangOptions.expansionFactor = 1.01;
      bigBangUniverse.expand();
    }

    whenAudioLoads(function () {
      bigBangUniverse.timeouts.push(setTimeout(function () {
        $('#bigBangUniverse').css('visibility', 'visible');
        bigBangUniverse.init()
      }, 7000));
    });
    queueUp('audio/bigBang.mp3');
  },
  pause: function () {
    bigBangUniverse.pause();
  }
};

var foldedTimeouts = [];
slideDirectory.foldedUniverseSlide = {
  start: function () {

    var delay = 2800,
      $img = $('.folded-photos img');

    $img.stop(true, true).hide();

    foldedTimeouts.forEach(clearTimeout);
    foldedTimeouts = [];

    whenAudioLoads(function(){
        foldedTimeouts.push(setTimeout(show0, 15000))
    });

    function show0() {
      $img.eq(0).fadeIn(delay, hide0);
    }

    function hide0() {
      foldedTimeouts.push(setTimeout(function () { $img.eq(0).fadeOut(delay, show1); }, 1000));
    }

    function show1() {
      foldedTimeouts.push(setTimeout(function () { $img.eq(1).fadeIn(delay, hide1); }, 1000));
    }

    function hide1() {
      foldedTimeouts.push(setTimeout(function () { $img.eq(1).fadeOut(delay, show2); }, 1000));
    }

    function show2() {
      foldedTimeouts.push(setTimeout(function () { $img.eq(2).fadeIn(delay, hide2); }, 1000));
    }

    function hide2() {
      foldedTimeouts.push(setTimeout(function () { $img.eq(2).fadeOut(delay, show3); }, 1000));
    }

    function show3() {
      foldedTimeouts.push(setTimeout(function () { $img.eq(3).fadeIn(delay); }, 1000));
    }

    queueUp('audio/foldedUniverse.mp3');

  },
  pause: function () {
    foldedTimeouts.forEach(clearTimeout);
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
    globeUniverse.init();
    queueUp('audio/globeUniverse.mp3');
  },
  pause: function () {
    globeUniverse.pause();
  }
};

var flatCircleOptions = {
  speedOfLight: 200,
  thrust: 5,
  width: 600,
  height: 600,
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
    $('#flatCircleUniverse').css('visibility', 'hidden');


    flatCircleUniverse.initCallback = function () {
      flatCircleUniverse.timeouts.push(setTimeout(function () { $link.fadeIn(1000); }, 25000));
    }

    whenAudioLoads(function () {
      flatCircleUniverse.timeouts.push(setTimeout(function () {
        $('#flatCircleUniverse').css('visibility', 'visible');
        flatCircleUniverse.init();
      }, 8000));
    });

    queueUp('audio/flatCircle.mp3');
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
    readyToAdvance = false;
    whenAudioLoads(expandingSphereUniverse.init.bind(expandingSphereUniverse));
    queueUp('audio/expandingCircle1.mp3');
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
    $li.css("visibility", "hidden");
    $img.removeClass('pulse');

    whenAudioLoads(function () {
      this.timeouts.push(setTimeout(function () { $img.eq(0).addClass('pulse'); }, 2000));
      this.timeouts.push(setTimeout(function () { $img.eq(1).addClass('pulse'); }, 4000));

      this.timeouts.push(setTimeout(function () { $li.eq(0).hide().css("visibility", "visible").fadeIn(1000); }, 24000));
      this.timeouts.push(setTimeout(function () { $li.eq(1).hide().css("visibility", "visible").fadeIn(1000); }, 29000));
      this.timeouts.push(setTimeout(function () { $li.eq(2).hide().css("visibility", "visible").fadeIn(1000); }, 33000));
    }.bind(this));
    queueUp('audio/infinite1.mp3');

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

    whenAudioLoads(function () {
      this.timeouts.push(setTimeout(function () { $equations.eq(0).hide().css("visibility", "visible").fadeIn(1000); }, 19000));
      this.timeouts.push(setTimeout(function () { $equations.eq(1).hide().css("visibility", "visible").fadeIn(1000); }, 25000));
      this.timeouts.push(setTimeout(function () { $equations.eq(2).hide().css("visibility", "visible").fadeIn(1000); }, 35000));
      this.timeouts.push(setTimeout(function () { $equations.eq(3).hide().css("visibility", "visible").fadeIn(1000); }, 43000));
      this.timeouts.push(setTimeout(function () { $equations.eq(4).hide().css("visibility", "visible").fadeIn(1000); }, 45000));
      this.timeouts.push(setTimeout(function () { $link.fadeIn(1000); }, 70000));
    }.bind(this));
    queueUp('audio/infinite2.mp3');

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
    whenAudioLoads(infiniteUniverse.init.bind(infiniteUniverse));
    queueUp('audio/infinite3.mp3');
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
    $li.css("visibility", "hidden");


    whenAudioLoads(function () {
      this.timeouts.push(setTimeout(function () { $li.eq(0).hide().css("visibility", "visible").fadeIn(1000); }, 11000));
      this.timeouts.push(setTimeout(function () { $li.eq(1).hide().css("visibility", "visible").fadeIn(1000); }, 31000));
    }.bind(this));

    queueUp('audio/corrections.mp3');

  },
  pause: function () {
    this.timeouts.forEach(clearTimeout);
  }
};

slideDirectory.credits = {
  timeouts:[],
  start: function () {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];

    var $credits = $('#credits h2, .icon-credits figure, .reviewer-credits, .image-credits:not(.icon-credits)');
    $credits.css("visibility", "hidden");
    
    whenAudioLoads(function () {
      this.timeouts.push(setTimeout(function () { $credits.eq(0).hide().css("visibility", "visible").fadeIn(1000); }, 5000));
      this.timeouts.push(setTimeout(function () { $credits.eq(1).hide().css("visibility", "visible").fadeIn(1000); }, 10000));
      this.timeouts.push(setTimeout(function () { $credits.eq(2).hide().css("visibility", "visible").fadeIn(1000); }, 13000));
      this.timeouts.push(setTimeout(function () { $credits.eq(3).hide().css("visibility", "visible").fadeIn(1000); }, 17000));
      this.timeouts.push(setTimeout(function () { $credits.eq(4).hide().css("visibility", "visible").fadeIn(1000); }, 20000));
    }.bind(this))
    
    
    
    queueUp('audio/credits.mp3');
  },
  pause: function () {
  }
};