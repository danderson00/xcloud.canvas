var xcloud = require('xtagcloud')
var measureText = require('./measureText')
var animate = require('./animate')

module.exports = function (words, options) {
  var width = options.width || xcloud.defaultOptions.width
  var height = options.height || xcloud.defaultOptions.height
  var canvas = options.canvas || createCanvas(width, height)
  var context = canvas.getContext('2d')  
  options = Object.assign({}, 
    { measureText: measureText, background: '#FFFFFF' }, 
    canvasDimensions(canvas, width, height), 
    options
  )

  var cloud = xcloud(words, options)
  renderCloud(cloud, options.background, canvas, context)

  if(options.target)
    options.target.appendChild(canvas)

  if(options.onFrameRendered)
    options.onFrameRendered({ canvas, words: cloud })

  return { canvas, words: cloud }
}

module.exports.animate = animate(module.exports, createCanvas, canvasDimensions)

function renderCloud(words, background, canvas, context) {
  context.fillStyle = background
  context.fillRect(0, 0, canvas.width, canvas.height)      
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