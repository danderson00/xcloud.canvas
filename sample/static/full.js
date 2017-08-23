const xcloud = require('../../src')
const words = require('../../../sample_data/words.json')

window.onload = function () {

  xcloud(words, { 
    target: document.getElementById('target'),
    // shape: 'rectangular',
    // padding: 5
  })
}