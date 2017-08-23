module.exports = function (word, font, size) {
  var span = createSpan(word, font, size)
  findBody().appendChild(span)
  var dimensions = {
    width: span.clientWidth,
    height: span.clientHeight
  }
  span.remove()
  return dimensions
}

function createSpan(word, font, size) {
  var span = document.createElement('span')
  span.style.cssText = `font-family: ${font}; font-size: ${size}px; display: block; position: absolute; top: 10000px; margin: 0; padding: 0;`
  span.innerHTML = word
  return span
}

function findBody() {
  var body = document.getElementsByTagName('body')
  if(body.length !== 1)
    throw new Error('HTML document does not contain a single body element')
  return body[0]
}