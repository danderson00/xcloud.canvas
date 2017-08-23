require('babel-polyfill')
const xcloud = require('../../src')
const words = require('../../../sample_data/frames.json')

window.onload = function () {
  const target = document.getElementById('target')
  let previous

  console.log(`Processing ${words.length} entries`)
  const startTime = (new Date()).getTime()
  next(0)

  function next(index) {
    const entry = words[index]

    if(index < words.length) {
      if(entry.length > 0) {
        setTimeout(() => {
          if(target.childNodes.length > 0)
            target.childNodes[0].remove()
      
          previous = xcloud(entry, { target, padding: index === 0 ? 5 : 0, previous, clear: true }).words

          if(index === words.length - 1)
            console.log(`Done in ${(((new Date()).getTime()) - startTime) / 1000} seconds`)

          next(index + 1)
        }, 30)
      } else {
        next(index + 1)        
      }
    }
  }
}

