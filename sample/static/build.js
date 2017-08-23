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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bounds = module.exports = {
  overlapping: function overlapping(a, b, padding) {
    padding = padding || 0;
    return !(b.left - padding > a.left + a.width + padding || a.left - padding > b.left + b.width + padding || b.top - padding > a.top + a.height + padding || a.top - padding > b.top + b.height + padding);
  },

  hitTest: function hitTest(newWord, existingWords, padding) {
    return existingWords.some(function (word) {
      return bounds.overlapping(newWord, word, padding);
    });
  },

  outsideContainer: function outsideContainer(word, width, height) {
    return word.left < 0 || word.top < 0 || word.left + word.width > width || word.top + word.height > height;
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var xcloud = __webpack_require__(2);
var words = __webpack_require__(8);

window.onload = function () {

  xcloud(words, {
    target: document.getElementById('target')
    // shape: 'rectangular',
    // padding: 5
  });
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var measureText = __webpack_require__(3);
var xcloud = __webpack_require__(4);

module.exports = function (words, options) {
  options = Object.assign({}, { measureText: measureText }, options);
  var cloud = xcloud(words, options);
  var canvas = options.canvas || createCanvas(options.width || xcloud.defaultOptions.width, options.height || xcloud.defaultOptions.height);

  renderCloud(cloud, canvas);

  if (options.target) options.target.appendChild(canvas);

  return { canvas: canvas, words: cloud };
};

function renderCloud(words, canvas) {
  var context = canvas.getContext('2d');
  words.forEach(function (word) {
    context.font = word.size + 'px ' + word.font;
    context.fillStyle = colorToCSS(word.color);
    context.fillText(word.text, word.left, word.top);
  });
}

function createCanvas(width, height) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.style.width = width;
  canvas.height = height;
  canvas.style.height = height;
  return canvas;
}

function colorToCSS(color) {
  return 'rgb(' + color.r + ', ' + color.g + ', ' + color.b + ')';
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (word, font, size) {
  var span = createSpan(word, font, size);
  findBody().appendChild(span);
  var dimensions = {
    width: span.clientWidth,
    height: span.clientHeight
  };
  span.remove();
  return dimensions;
};

function createSpan(word, font, size) {
  var span = document.createElement('span');
  span.style.cssText = 'font-family: ' + font + '; font-size: ' + size + 'px; display: block; position: absolute; top: 10000px; margin: 0; padding: 0;';
  span.innerHTML = word;
  return span;
}

function findBody() {
  var body = document.getElementsByTagName('body');
  if (body.length !== 1) throw new Error('HTML document does not contain a single body element');
  return body[0];
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fontSizes = __webpack_require__(5);
var colorGenerator = __webpack_require__(6);
var bounds = __webpack_require__(0);
var layout = __webpack_require__(7);

var defaultOptions = {
  width: 640,
  height: 480,
  padding: 0,
  steps: 10,
  shape: 'elliptic',
  removeOverflowing: true,
  colors: { from: { r: 34, g: 85, b: 153 }, to: { r: 227, g: 236, b: 249 } },
  fontSize: { from: 0.02, to: 0.07 },
  font: 'Arial'
};

module.exports = function (words, options) {
  options = Object.assign({}, defaultOptions, options);

  words.forEach(function (word) {
    return word.weight = parseFloat(word.weight, 10);
  });
  words.sort(function (a, b) {
    return b.weight - a.weight;
  });

  var outputWords = [];
  var maxWeight = words[0].weight;
  var minWeight = words[words.length - 1].weight;
  var sizes = fontSizes.generate(options.fontSize, options.steps, options.width, options.height);
  var colors = colorGenerator.generate(options.colors, options.steps);

  if (options.previous) layoutFromPrevious();else words.forEach(function (word, index) {
    return layoutWord(index, word);
  });

  return outputWords;

  function layoutFromPrevious() {
    var previousWords = options.previous.reduce(function (words, word) {
      return words[word.text] = word, words;
    }, {});
    var wordsForSecondPass = [];
    var wordsForThirdPass = [];

    // first pass - lay out each word that was previously rendered in the same place, if possible
    words.forEach(function (word) {
      var previousWord = previousWords[word.text];
      var weight = fontSizes.mapWeightToScale(word.weight, minWeight, maxWeight, options.steps);
      var dimensions = options.measureText(word.text, options.font, sizes[weight - 1]);

      if (previousWord) {
        var outputWord = createOutputWord(word, weight, dimensions, previousWord.left - (dimensions.width - previousWord.width) / 2.0, previousWord.top - (dimensions.height - previousWord.height) / 2.0);

        if (!bounds.hitTest(outputWord, outputWords)) {
          outputWords.push(outputWord);
        } else {
          wordsForSecondPass.push(word);
        }
      } else {
        wordsForThirdPass.push(word);
      }
    });

    // second pass - lay out each word that couldn't be placed in first pass
    wordsForSecondPass.forEach(function (word, index) {
      return layoutWord(index, word);
    });

    // third pass - lay out remaining words with no previous word
    wordsForThirdPass.forEach(function (word, index) {
      return layoutWord(index, word);
    });
  }

  function layoutWord(index, word) {
    var weight = fontSizes.mapWeightToScale(word.weight, minWeight, maxWeight, options.steps);
    var dimensions = options.measureText(word.text, options.font, sizes[weight - 1]);

    var outputWord = layout.next(index, options, outputWords, createOutputWord(word, weight, dimensions, (options.width - dimensions.width) / 2.0, (options.height - dimensions.height) / 2.0));

    if (!(options.removeOverflowing && bounds.outsideContainer(outputWord, options.width, options.height))) outputWords.push(outputWord);
  }

  function createOutputWord(word, weight, dimensions, left, top) {
    return {
      color: colors[weight - 1],
      size: sizes[weight - 1],
      weight: weight,
      text: word.text,
      font: options.font,
      width: dimensions.width,
      height: dimensions.height,
      left: left,
      top: top
    };
  }
};

module.exports.defaultOptions = defaultOptions;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
  generate: function generate(option, steps, width, height) {
    var generator = module.exports.createGenerator(option, steps);
    var result = [];

    for (var i = 1; i <= steps; i++) {
      result.push(generator(width, height, i));
    }

    return result;
  },
  createGenerator: function createGenerator(option, steps) {
    if (typeof option == 'function') {
      return option;
    } else if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object') {
      return function (width, height, weight) {
        var max = width * option.to;
        var min = width * option.from;
        return Math.round(min + (max - min) * 1.0 / (steps - 1) * (weight - 1));
      };
    }
  },

  mapWeightToScale: function mapWeightToScale(weight, minWeight, maxWeight, steps) {
    if (minWeight !== maxWeight) return Math.round((weight - minWeight) * 1.0 * (steps - 1) / (maxWeight - minWeight)) + 1;else return Math.round(steps / 2);
  }
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = {
  generate: function generate(option, steps) {
    var generator = module.exports.createGenerator(option, steps);
    var result = [];

    for (var i = 1; i <= steps; i++) {
      result.push(generator(i));
    }

    return result.reverse();
  },
  createGenerator: function createGenerator(option, steps) {
    if (typeof option == 'function') {
      return option;
    } else if ((typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object') {
      return function (weight) {
        return {
          r: Math.round(option.from.r + (option.to.r - option.from.r) * (1 / steps) * (steps - weight)),
          g: Math.round(option.from.g + (option.to.g - option.from.g) * (1 / steps) * (steps - weight)),
          b: Math.round(option.from.b + (option.to.b - option.from.b) * (1 / steps) * (steps - weight))
        };
      };
    }
  }
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bounds = __webpack_require__(0);

var layout = module.exports = {
  next: function next(index, options, outputWords, outputWord) {
    return layout[options.shape](index, outputWord, outputWords, options.width, options.height, options.padding);
  },

  elliptic: function elliptic(index, outputWord, outputWords, width, height, padding) {
    var currentAngle = Math.random() * 6.28;
    var radius = 0.0;
    var step = 2.0;
    var aspectRatio = width / height;

    while (bounds.hitTest(outputWord, outputWords, padding)) {
      radius += step;
      currentAngle += (index % 2 === 0 ? 1 : -1) * step;

      outputWord.left = (width - outputWord.width) / 2.0 + radius * Math.cos(currentAngle) * aspectRatio;
      outputWord.top = (height - outputWord.height) / 2.0 + radius * Math.sin(currentAngle);
    }

    return outputWord;
  },

  rectangular: function rectangular(index, outputWord, outputWords, width, height, padding) {
    var stepsInDirection = 0.0;
    var quarterTurns = 0.0;
    var step = 18.0;
    var aspectRatio = width / height;

    while (bounds.hitTest(outputWord, outputWords, padding)) {
      stepsInDirection++;

      if (stepsInDirection * step > (1 + Math.floor(quarterTurns / 2.0)) * step * (quarterTurns % 4 % 2 === 0 ? 1 : aspectRatio)) {
        stepsInDirection = 0.0;
        quarterTurns++;
      }

      switch (quarterTurns % 4) {
        case 1:
          outputWord.left += step * aspectRatio + Math.random() * 2.0;
          break;
        case 2:
          outputWord.top -= step + Math.random() * 2.0;
          break;
        case 3:
          outputWord.left -= step * aspectRatio + Math.random() * 2.0;
          break;
        case 0:
          outputWord.top += step + Math.random() * 2.0;
          break;
      }
    }

    return outputWord;
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = [{"text":"awesome","weight":39},{"text":"day","weight":36},{"text":"good","weight":34},{"text":"time","weight":31},{"text":"work","weight":28},{"text":"pretty","weight":25},{"text":"bit","weight":22},{"text":"people","weight":22},{"text":"today","weight":20},{"text":"things","weight":20},{"text":"cool","weight":19},{"text":"days","weight":19},{"text":"great","weight":19},{"text":"love","weight":19},{"text":"lol","weight":18},{"text":"fuck","weight":18},{"text":"life","weight":18},{"text":"night","weight":17},{"text":"shit","weight":17},{"text":"facebook","weight":17},{"text":"amazing","weight":16},{"text":"fucking","weight":14},{"text":"week","weight":14},{"text":"fun","weight":13},{"text":"interesting","weight":13},{"text":"hard","weight":12},{"text":"canberra","weight":12},{"text":"happy","weight":12},{"text":"weekend","weight":11},{"text":"stuff","weight":11},{"text":"long","weight":11},{"text":"worth","weight":11},{"text":"web","weight":11},{"text":"aussie","weight":10},{"text":"wow","weight":10},{"text":"thing","weight":10},{"text":"years","weight":10},{"text":"yeh","weight":10},{"text":"phone","weight":9},{"text":"watch","weight":9},{"text":"code","weight":9},{"text":"thoughts","weight":9},{"text":"feel","weight":9},{"text":"crazy","weight":9},{"text":"half","weight":9},{"text":"metal","weight":9},{"text":"snow","weight":9},{"text":"live","weight":9},{"text":"sweet","weight":8},{"text":"finally","weight":8}]

/***/ })
/******/ ]);