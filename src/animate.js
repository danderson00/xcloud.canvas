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

    var api = {
      canvas: canvas,
      status: 'playing',
      play: function() {
        clearTimeout(timeout)
        api.status = 'playing'
        next(currentFrame)
        return api
      },
      pause: function() {
        api.status = 'paused'
        clearTimeout(timeout)
        return api
      },
      replay: function() {
        clearTimeout(timeout)
        currentFrame = 0
        api.status = 'playing'
        next(currentFrame)
        return api
      }
    }

    return api

    function next(index) {
      var words = wordArray[index]
      
      if(index < wordArray.length) {
        if(words.length > 0) {
          timeout = setTimeout(function() {
            currentFrame = index
            previous = render(words, Object.assign({ canvas: canvas, padding: index === 0 ? 5 : 0, previous: previous }, options)).words
            next(index + 1)
          }, options.delay)
        } else {
          next(index + 1)        
        }
      } else {
        currentFrame = 0
        api.status = 'complete'
        if(options.onAnimationComplete) {
          options.onAnimationComplete({ canvas: canvas })
        }
      }
    }  
  }
}
