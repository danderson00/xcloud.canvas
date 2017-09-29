var xcloud = require('xtagcloud')

module.exports = function (render, createCanvas, canvasDimensions) {
  return function (wordArray, options) {
    var previous
    var width = options.width || xcloud.defaultOptions.width
    var height = options.height || xcloud.defaultOptions.height
    var canvas = options.canvas || createCanvas(width, height)
    options = Object.assign({}, { delay: 30 }, canvasDimensions(canvas, width, height), options)

    var currentFrame = 0
    var animating = true
    var timeout

    next(currentFrame)

    var api = {
      canvas,
      status: 'playing',
      play: function() {
        clearTimeout(timeout)
        api.status = 'playing'
        next(currentFrame)
      },
      pause: function() {
        api.status = 'paused'
        clearTimeout(timeout)
      },
      replay: function() {
        clearTimeout(timeout)
        currentFrame = 0
        api.status = 'playing'
        next(currentFrame)
      }
    }

    return api

    function next(index) {
      var words = wordArray[index]
      
      if(index < wordArray.length) {
        if(words.length > 0) {
          timeout = setTimeout(function() {
            previous = render(words, Object.assign({ canvas, padding: index === 0 ? 5 : 0, previous }, options)).words
            next(index + 1)
          }, options.delay)
        } else {
          next(index + 1)        
        }
      } else {
        api.status = 'complete'
        if(options.onAnimationComplete) {
          options.onAnimationComplete({ canvas })
        }
      }
    }  
  }
}
