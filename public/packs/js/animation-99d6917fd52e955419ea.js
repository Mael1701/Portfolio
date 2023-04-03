/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/javascript/packs/animation.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/javascript/packs/animation.js":
/*!*******************************************!*\
  !*** ./app/javascript/packs/animation.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var container = document.querySelector(".anime-container");
var sparks = [];
var sparksIndex = 0;
var a = 10;
// I did a test and it seems mousemove only fires every frame (screen refresh), so sparkCount should be more than the frames a sec they get (so 60 for me).
var sparkCount = 100;
var sparkParticleCount = 6;
function lerp(p1, p2, t) {
  return p1 + (p2 - p1) * t;
}

//https://gist.github.com/gre/1650294
var ease = {
  // no easing, no acceleration
  linear: function linear(t) {
    return t;
  },
  // accelerating from zero velocity
  inQuad: function inQuad(t) {
    return t * t;
  },
  // decelerating to zero velocity
  outQuad: function outQuad(t) {
    return t * (2 - t);
  },
  // acceleration until halfway, then deceleration
  inOutQuad: function inOutQuad(t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  },
  // accelerating from zero velocity
  inCubic: function inCubic(t) {
    return t * t * t;
  },
  // decelerating to zero velocity
  outCubic: function outCubic(t) {
    return --t * t * t + 1;
  },
  // acceleration until halfway, then deceleration
  inOutCubic: function inOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  },
  // accelerating from zero velocity
  inQuart: function inQuart(t) {
    return t * t * t * t;
  },
  // decelerating to zero velocity
  outQuart: function outQuart(t) {
    return 1 - --t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  inOutQuart: function inOutQuart(t) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
  },
  // accelerating from zero velocity
  inQuint: function inQuint(t) {
    return t * t * t * t * t;
  },
  // decelerating to zero velocity
  outQuint: function outQuint(t) {
    return 1 + --t * t * t * t * t;
  },
  // acceleration until halfway, then deceleration
  inOutQuint: function inOutQuint(t) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
  }
};

// https://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
function circularRandom(r) {
  // Math.abs(Math.random() - Math.random()) makes it have a bias towards 0, or in our case the center
  r = r * Math.sqrt(Math.abs(Math.random() - Math.random()));
  var theta = Math.random() * 2 * Math.PI;
  var x = r * Math.cos(theta);
  var y = r * Math.sin(theta);
  return {
    x: x,
    y: y,
    r: r
  };
}

// Create the sparks
for (var i = 0; i <= sparkCount; i += 1) {
  var spark = {
    els: []
  };
  for (var j = 0; j < sparkParticleCount; j++) {
    var dot = document.createElement("div");
    dot.classList.add("dot");
    container.appendChild(dot);
    spark.els.push(dot);
    var particleSize = anime.random(5, 20);
    var sparkRadius = 20;
    var _circularRandom = circularRandom(sparkRadius),
      x = _circularRandom.x,
      y = _circularRandom.y,
      r = _circularRandom.r;

    // Make particles further from the center, smaller
    dot.style.width = lerp(particleSize, 1, ease.outQuad(r / sparkRadius)) + "px";
    dot.style.height = lerp(particleSize, 1, ease.outQuad(r / sparkRadius)) + "px";
    dot.style.opacity = "0";
    // by setting the particles start offset position using translate we can reposition the spark using left and top
    dot.style.transform = "translateX(" + x + "px) translateY(" + y + "px)";
  }
  spark.anime = new anime({
    targets: spark.els,
    loop: false,
    easing: "linear",
    autoplay: false,
    delay: anime.stagger(8),
    opacity: [{
      value: 0,
      duration: 0
    }, {
      value: 1,
      duration: 40
    }, {
      value: 0,
      duration: function duration() {
        return anime.random(500, 800);
      }
    }],
    width: {
      value: 2,
      duration: 500
    },
    height: {
      value: 2,
      duration: 500
    },
    translateX: {
      value: function value() {
        return anime.random(-30, 30);
      },
      duration: 800
    },
    translateY: {
      value: function value() {
        return anime.random(-30, 30);
      },
      duration: 800
    }
  });
  sparks.push(spark);
}

// Mouse trail bit
window.addEventListener("mousemove", function (e) {
  anime.set(sparks[sparksIndex].els, {
    left: e.pageX,
    top: e.pageY
  });
  sparks[sparksIndex].anime.restart();
  sparksIndex++;
  if (sparksIndex == sparks.length) sparksIndex = 0;
}, false);
var TxtRotate = function TxtRotate(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};
TxtRotate.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];
  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }
  this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';
  var that = this;
  var delta = 300 - Math.random() * 100;
  if (this.isDeleting) {
    delta /= 2;
  }
  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }
  setTimeout(function () {
    that.tick();
  }, delta);
};
window.onload = function () {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i = 0; i < elements.length; i++) {
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

/***/ })

/******/ });
//# sourceMappingURL=animation-99d6917fd52e955419ea.js.map