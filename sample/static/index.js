const xcloud = require('../../src')
require('babel-polyfill')

window.onload = function () {
  const words = [
    { text: 'test1', weight: 1 },
    { text: 'test2', weight: 2 },
    { text: 'test3', weight: 3 },
    { text: 'test4', weight: 3 },
    { text: 'test5', weight: 4 },
    { text: 'test6', weight: 4 },
    { text: 'test7', weight: 5 },
    { text: 'test8', weight: 1 },
    { text: 'test9', weight: 7 },
    { text: 'test10', weight: 4 },
    { text: 'test11', weight: 2 },
    { text: 'test12', weight: 5 },
    { text: 'test13', weight: 6 },
    { text: 'test14', weight: 3 },
    { text: 'test15', weight: 3 },
    { text: 'test16', weight: 1 },
    { text: 'test17', weight: 5 },
    { text: 'test18', weight: 8 },
    { text: 'test19', weight: 2 },
    { text: 'test20', weight: 3 },
    { text: 'test21', weight: 2 },
    { text: 'test22', weight: 6 },
    { text: 'test23', weight: 4 },
    { text: 'test24', weight: 3 },
    { text: 'test25', weight: 5 },
    { text: 'test26', weight: 2 },
    { text: 'test27', weight: 2 },
    { text: 'test28', weight: 3 },
    { text: 'test29', weight: 1 },
    { text: 'test30', weight: 4 },
  ]

  xcloud(words, { 
    target: document.getElementById('target'),
    // shape: 'rectangular',
    // padding: 5
  })
}