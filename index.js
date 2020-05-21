const { Subject, Observable, interval, operators } = require("rxjs");
const { map, flatMap } = require("rxjs/operators");
const defaultData = require("./data/Crimson deer.json");
const pipes = require("@neurosity/pipes");

const FREQUENCY = 250 / 64;

const SAMPLE_EMIT_AT_ONCE = 5

class Notion {
  constructor(opts = {}) {
    if (opts.data) {
      console.log("using supplied data");
      this.sourceData = data;
    } else {
      console.log("using default data");
      this.sourceData = defaultData;
    }
  }

  async login() {
    // do nothing
  }

  brainwaves(type) {
    if (type !== "raw") {
      throw new Error("Only works with 'raw'");
    }

    const stream = interval((1000 / 250) * SAMPLE_EMIT_AT_ONCE).pipe(
      flatMap((i) => {
        return new Observable((observer) => {
					for (let s = 0; s < SAMPLE_EMIT_AT_ONCE; s++) {
						observer.next(i + s);
					}
        });
      }),
      map((i) => {
        return this.sourceData.samples[i % this.sourceData.samples.length];
      }),
      map((a) => {
        return {
          data: a.data,
          timestamp: a.timestamp,
        };
      }),
      map((sample) => {
        // console.log('sample', sample)
        return sample;
      }),
      pipes.epoch({ duration: 64, interval: 64, samplingRate: 250 }),
      pipes.bandpassFilter({
        samplingRate: 250,
        cutoffFrequencies: [1, 45],
        order: 2,
        nbChannels: 8,
        characteristic: "butterworth",
      }),
      pipes.notchFilter({
        bandWidth: 0.5,
        samplingRate: 250,
        cutoffFrequency: 50,
        order: 2,
        nbChannels: 8,
        characteristic: "butterworth",
      })
    );

    return stream;
  }
}

module.exports = { Notion };
