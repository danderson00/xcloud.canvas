require('babel-polyfill')
const xcloud = require('../../src')

const words = [
  [
    { text: 'test1', weight: 2 },
    { text: 'test2', weight: 2 },
    { text: 'test3', weight: 4 },
    { text: 'test4', weight: 4 },
    { text: 'test5', weight: 3 }
  ],
  [
    { text: 'test1', weight: 3 },
    { text: 'test2', weight: 1 },
    { text: 'test3', weight: 5 },
    { text: 'test4', weight: 4 },
    { text: 'test5', weight: 3 }
  ],
  [
    { text: 'test1', weight: 4 },
    { text: 'test2', weight: 1 },
    { text: 'test3', weight: 4 },
    { text: 'test4', weight: 3 },
    { text: 'test5', weight: 1 }
  ],
]

window.onload = function () {
  xcloud.animate(words, { canvas: document.getElementById('target'), delay: 100 }).play()
}

