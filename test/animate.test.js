const xtagcloud = require('..')
const expect = require('chai').expect
const delay = require('./utils').delay

const data = [
  [{ text: 'test1', weight: 1 }],
  [{ text: 'test1', weight: 2 }],
  [{ text: 'test1', weight: 3 }]
]

describe('xtagcloud.canvas.animate', () => {
  // it's extremely difficult to validate changes to a canvas
  // for basic testing, just validate the image has changed

  it('animates frame', () => {
    const cloud = xtagcloud.animate(data, { target: document.getElementsByTagName('body')[0], delay: 0 })
    const initialData = cloud.canvas.toDataURL()
    return delay().then(() => expect(cloud.canvas.toDataURL()).to.not.equal(initialData))
  })

  it('can be paused and resumed', () => {
    const cloud = xtagcloud.animate(data, { target: document.getElementsByTagName('body')[0], delay: 10 })
    let image

    return delay()
      .then(() => {
        expect(cloud.status).to.equal('playing')
        cloud.pause()
        image = cloud.canvas.toDataURL()
        return delay(10)
      })
      .then(() => {
        expect(cloud.status).to.equal('paused')
        expect(cloud.canvas.toDataURL()).to.equal(image)
        cloud.play()
        return delay(10)
      })
      .then(() => {
        expect(cloud.status).to.equal('playing')        
        expect(cloud.canvas.toDataURL()).to.not.equal(image)
        return delay(50)
      })
      .then(() => {
        expect(cloud.status).to.equal('complete')        
      })
  })
})