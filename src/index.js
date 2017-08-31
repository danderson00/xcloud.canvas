var measureText = require('./measureText')
var xcloud = require('xtagcloud')

module.exports = function (words, options) {
  options = Object.assign({}, { measureText: measureText }, options)
  var cloud = xcloud(words, options)
  var canvas = options.canvas || createCanvas(options.width || xcloud.defaultOptions.width, options.height || xcloud.defaultOptions.height)

  renderCloud(cloud, canvas, options.clear)

  if(options.target)
    options.target.appendChild(canvas)

  return { canvas, words: cloud }
}

module.exports.animate = function (wordArray, options) {
  var previous
  var canvas = options.canvas || createCanvas(options.width || xcloud.defaultOptions.width, options.height || xcloud.defaultOptions.height)
  
  options = Object.assign({}, { delay: 30 }, options)
  
  next(0)

  function next(index) {
    var words = wordArray[index]
    
    if(index < wordArray.length) {
      if(words.length > 0) {
        setTimeout(() => {
          previous = module.exports(words, { canvas, padding: index === 0 ? 5 : 0, previous }).words
          next(index + 1)
        }, options.delay)
      } else {
        next(index + 1)        
      }
    }
  }  
}

function renderCloud(words, canvas, clear) {
  var context = canvas.getContext('2d')
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

function colorToCSS(color) {
  return `rgb(${color.r}, ${color.g}, ${color.b})`  
}