var measureText = require('./measureText')
var xcloud = require('xtagcloud')

module.exports = function (words, options) {
  var width = options.width || xcloud.defaultOptions.width
  var height = options.height || xcloud.defaultOptions.height
  var canvas = options.canvas || createCanvas(width, height)
  var context = canvas.getContext('2d')  
  options = Object.assign({}, { measureText: measureText }, canvasDimensions(canvas, width, height), options)

  var cloud = xcloud(words, options)
  renderCloud(cloud, canvas, context)

  if(options.target)
    options.target.appendChild(canvas)

  if(options.onFrameRendered)
    options.onFrameRendered({ canvas, words: cloud })

  return { canvas, words: cloud }
}

module.exports.animate = function (wordArray, options) {
  var previous
  var width = options.width || xcloud.defaultOptions.width
  var height = options.height || xcloud.defaultOptions.height
  var canvas = options.canvas || createCanvas(width, height)
  options = Object.assign({}, { delay: 30 }, canvasDimensions(canvas, width, height), options)

  next(0)

  function next(index) {
    var words = wordArray[index]
    
    if(index < wordArray.length) {
      if(words.length > 0) {
        setTimeout(function() {
          previous = module.exports(words, { canvas, padding: index === 0 ? 5 : 0, previous }).words
          next(index + 1)
        }, options.delay)
      } else {
        next(index + 1)        
      }
    } else {
      if(options.onAnimationComplete)
        options.onAnimationComplete({ canvas })
    }
  }  
}

function renderCloud(words, canvas, context) {
  context.clearRect(0, 0, canvas.width, canvas.height)      
  words.forEach(function(word) {
    context.font = `${word.size}px ${word.font}`
    context.fillStyle = colorToCSS(word.color)
    context.fillText(word.text, word.left, word.top)
  })
}

function createCanvas(width, height) {
  var canvas = document.createElement('canvas')
  canvas.width = width
  canvas.style.width = width
  canvas.height = height
  canvas.style.height = height
  return canvas
}

function canvasDimensions(canvas, defaultWidth, defaultHeight) {
  var rect = canvas.getBoundingClientRect()
  return {
    width: Math.floor(rect.width) || defaultWidth,
    height: Math.floor(rect.height) || defaultHeight
  }
}

function colorToCSS(color) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`  
}