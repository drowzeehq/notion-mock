const { Subject } = require("rxjs")
const data = require("./data/Obsidian chameleon.json")

const FREQUENCY = 250/64

class Notion {
  constructor(){
    this.sourceData = data
  }

  async login(){
    // do nothing
  }

  brainwaves(type){
    if(type !== "raw"){
      throw new Error("Only works with 'raw'")
    }

    const stream = new Subject()
    
    let i = 0
    setInterval(() => {
      // console.log('lineData: ', Object.values(lineData));
      let packet = {
        data: Array(8).fill([]),
        info: {
          channelNames: [
            'CP6',  'F6',
             'C4', 'CP4',
            'CP3',  'F5',
             'C3', 'CP5'
          ],
          notchFrequency: '50Hz',
          samplingRate: 250,
          startTime: this.sourceData.samples[i].timestamp
        },
        label: 'raw'
      }

      Array(64).fill().forEach(() => {

        if (i == this.sourceData.samples.length - 1) {
          i = 0
        }
  
        this.sourceData.samples[i].data.forEach((s, si) => {
          packet.data[si].push(s)
        })
        
        i++

      })
        

      stream.next(packet)
    }, 1000 / FREQUENCY)

    return stream
  }
}


module.exports = Notion