const measureText = require('./measureText')
const xcloud = require('xcloud')

module.exports = function (words, options) {
  options = Object.assign({}, { measureText: measureText }, options)
  const cloud = xcloud(words, options)
  const canvas = options.canvas || createCanvas(options.width || xcloud.defaultOptions.width, options.height || xcloud.defaultOptions.height)

  renderCloud(cloud, canvas, options.clear)

  if(options.target)
    options.target.appendChild(canvas)

  return { canvas, words: cloud }
}

function renderCloud(words, canvas, clear) {
  const context = canvas.getContext('2d')
  words.forEach(word => {
    if(clear)
      context.clearRect(word.left, word.top, word.width, word.height)
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