const World = require('..')('1.12.1')
const Chunk = require('prismarine-chunk')('1.12.1')
const os = require('os')
const path = require('path')
const mkdirp = require('mkdirp')

async function benchmark () {
  for (let i = 0; i < 100; i++) {
    let worldDir = path.join(os.tmpdir(), 'tmp-world-' + Math.round(Math.random() * 100000))
    mkdirp.sync(worldDir)

    let w = new World(() => new Chunk(), worldDir, 1)
    let col = await w.getColumn(0, 0)
    await w.setColumn(0, 0, col, true)
    await w.waitSaving()
    await w.stopSaving()
  }
}

module.exports = benchmark
