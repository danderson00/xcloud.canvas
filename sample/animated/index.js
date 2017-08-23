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
  const target = document.getElementById('target')
  let previous = xcloud(words[0], { target, padding: 5 }).words

  setTimeout(() => {
    target.childNodes[0].remove()
    previous = xcloud(words[1], { target, previous }).words

    setTimeout(() => {
      target.childNodes[0].remove()
      xcloud(words[2], { target, previous })
    }, 500)
  }, 500)
}

