import anime from 'animejs/lib/anime.es.js';
document.addEventListener('DOMContentLoaded', () => {
  var container = document.querySelector(".anime-container");

var sparks = [];
var sparksIndex = 0;

var a = 10;
// I did a test and it seems mousemove only fires every frame (screen refresh), so sparkCount should be more than the frames a sec they get (so 60 for me).
var sparkCount = 20;
var sparkParticleCount = 2;

function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

//https://gist.github.com/gre/1650294
const ease = {
  // no easing, no acceleration
  linear: (t) => t,
  // accelerating from zero velocity
  inQuad: (t) => t * t,
  // decelerating to zero velocity
  outQuad: (t) => t * (2 - t),
  // acceleration until halfway, then deceleration
  inOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  // accelerating from zero velocity
  inCubic: (t) => t * t * t,
  // decelerating to zero velocity
  outCubic: (t) => --t * t * t + 1,
  // acceleration until halfway, then deceleration
  inOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  // accelerating from zero velocity
  inQuart: (t) => t * t * t * t,
  // decelerating to zero velocity
  outQuart: (t) => 1 - --t * t * t * t,
  // acceleration until halfway, then deceleration
  inOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),
  // accelerating from zero velocity
  inQuint: (t) => t * t * t * t * t,
  // decelerating to zero velocity
  outQuint: (t) => 1 + --t * t * t * t * t,
  // acceleration until halfway, then deceleration
  inOutQuint: (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
};

// https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
function circularRandom(r) {
  // Math.abs(Math.random() - Math.random()) makes it have a bias towards 0, or in our case the center
  r = r * Math.sqrt(Math.abs(Math.random() - Math.random()));
  var theta = Math.random() * 2 * Math.PI;
  var x = r * Math.cos(theta);
  var y = r * Math.sin(theta);
  return { x: x, y: y, r: r };
}

// Create the sparks
for (var i = 0; i <= sparkCount; i += 1) {
  var spark = { els: [] };

  var sparkEl = document.createElement("div");
  sparkEl.classList.add("spark");
  container.appendChild(sparkEl);

  for (var j = 0; j < sparkParticleCount; j++) {
    var dot = document.createElement("div");
    dot.classList.add("dot");
    sparkEl.appendChild(dot);
    spark.els.push(dot);

    var particleSize = anime.random(5, 20);
    var sparkRadius = 20;
    var { x, y, r } = circularRandom(sparkRadius);

    // Make particles further from the center, smaller
    dot.style.width = lerp(particleSize, 1, ease.outQuad(r / sparkRadius)) + "px";
    dot.style.height = lerp(particleSize, 1, ease.outQuad(r / sparkRadius)) + "px";
    dot.style.opacity = "0";
    // by setting the particles start offset position using translate we can reposition the spark using left and top
    dot.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
  }

  spark.anime = new anime({
    targets: sparkEl,
    loop: false,
    easing: "linear",
    autoplay: false,
    delay: anime.stagger(8),
    opacity: [
      { value: 0, duration: 0 },
      { value: 1, duration: 40 },
      {
        value: 0,
        duration: function () {
          return anime.random(500, 800);
        },
      },
    ],
    scale: { value: 0.5, duration: 500 },
    translateX: {
      value: function () {
        return anime.random(-30, 30);
      },
      duration: 800,
    },
    translateY: {
      value: function () {
        return anime.random(-30, 30);
      },
      duration: 800,
    },
  });
  sparks.push(spark);
}

// Mouse trail bit
let lastFrameTime = 0;
window.addEventListener(
  "mousemove",
  function (e) {
    const currentFrameTime = performance.now();
    const timeSinceLastFrame = currentFrameTime - lastFrameTime;

    if (timeSinceLastFrame >= 16) {
      anime.set(sparks[sparksIndex].els, {
        left: e.pageX,
        top: e.pageY,
      });
      sparks[sparksIndex].anime.restart();
      sparksIndex++;
      if (sparksIndex == sparks.length) sparksIndex = 0;

      lastFrameTime = currentFrameTime;
    }
  },
  false
);
});




var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 300 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

window.onload = function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
  // INJECT CSS
  var css = document.createElement("style");
  css.type = "text/css";
  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
  document.body.appendChild(css);
};
