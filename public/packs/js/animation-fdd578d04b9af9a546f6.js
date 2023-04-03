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

document.addEventListener("DOMContentLoaded", function () {
  var maelMicout = document.getElementById("mael-micout");
  var fullStackDeveloper = document.getElementById("full-stack-developer");
  function animateMaelMicout() {
    maelMicout.style.display = "inline";
    fullStackDeveloper.style.display = "none";
    anime.timeline().add({
      targets: maelMicout,
      opacity: [1, 0],
      translateY: ["0", "-50px"],
      duration: 1000,
      easing: "easeInOutQuad"
    }).add({
      targets: fullStackDeveloper,
      opacity: [0, 1],
      translateY: ["50px", "0"],
      duration: 1000,
      easing: "easeInOutQuad"
    }).add({
      targets: "#animation-container",
      complete: function complete() {
        setTimeout(animateFullStackDeveloper, 1000); // Attendre 1 seconde avant de lancer l'animation pour "Full Stack Developer"
      }
    });
  }

  function animateFullStackDeveloper() {
    maelMicout.style.display = "none";
    fullStackDeveloper.style.display = "inline";
    anime.timeline().add({
      targets: fullStackDeveloper,
      opacity: [1, 0],
      translateY: ["0", "-50px"],
      duration: 1000,
      easing: "easeInOutQuad"
    }).add({
      targets: maelMicout,
      opacity: [0, 1],
      translateY: ["50px", "0"],
      duration: 1000,
      easing: "easeInOutQuad"
    }).add({
      targets: "#animation-container",
      complete: function complete() {
        setTimeout(animateMaelMicout, 1000); // Attendre 1 seconde avant de lancer l'animation pour "Mael Micout"
      }
    });
  }

  setTimeout(animateMaelMicout, 1000);
});

/***/ })

/******/ });
//# sourceMappingURL=animation-fdd578d04b9af9a546f6.js.map