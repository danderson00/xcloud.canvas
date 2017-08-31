require('babel-polyfill')
const xcloud = require('../../src')
const words = require('../../../sample_data/frames.json')

window.onload = function () {
  xcloud.animate(words, { canvas: document.getElementById('target') })
}

