const { Subject, interval, operators } = require("rxjs")
const { map } = require("rxjs/operators")
const data = require("./data/Hickory hedgehog.json")
const pipes = require("@neurosity/pipes")

const FREQUENCY = 250 / 64

class Notion {
  constructor() {
    this.sourceData = data
  }

  async login() {
    // do nothing
  }

  brainwaves(type) {
    if (type !== "raw") {
      throw new Error("Only works with 'raw'")
    }

    const stream = interval(1000 / 250).pipe(
      map(i => {
        return this.sourceData.samples[i]
      }),
      map(a => {
        return {
          data: a.data,
          timestamp: a.timestamp,
        };
      }),
      map(sample => {
        // console.log('sample', sample)
        return sample
      }),
      pipes.epoch({ duration: 64, interval: 64, samplingRate: 250 }),
      pipes.bandpassFilter({
        samplingRate: 250,
        cutoffFrequencies: [1,45],
        order: 2,
        nbChannels: 8,
        characteristic: "butterworth"
      }),
      pipes.notchFilter({
        bandWidth: 0.5,
        samplingRate: 250,
        cutoffFrequency: 50,
        order: 2,
        nbChannels: 8,
        characteristic: "butterworth"
      })
    ).subscribe(a => {
      console.log('sampleAfterPipes', a)
    })

    return stream

  }
}


module.exports = { Notion }