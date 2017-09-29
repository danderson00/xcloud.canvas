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

    return {
      canvas,
      play: () => {
        clearTimeout(timeout)
        next(currentFrame)
      },
      pause: () => {
        clearTimeout(timeout)
      },
      replay: () => {
        clearTimeout(timeout)
        currentFrame = 0
        next(currentFrame)
      }
    }

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
        if(options.onAnimationComplete)
          options.onAnimationComplete({ canvas })
      }
    }  
  }
}
