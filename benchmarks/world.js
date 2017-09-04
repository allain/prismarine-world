const World = require('..')('1.12.1')
const Chunk = require('prismarine-chunk')('1.12.1')
const os = require('os')
const path = require('path')
const mkdirp = require('mkdirp')
const Vec3 = require('vec3')

function generateRandomChunk (chunkX, chunkZ) {
  var chunk = new Chunk()

  for (var x = 0; x < 16; x++) {
    for (var z = 0; z < 16; z++) {
      chunk.setBlockType(new Vec3(x, 50, z), Math.floor(Math.random() * 50))
      for (var y = 0; y < 256; y++) {
        chunk.setSkyLight(new Vec3(x, y, z), 15)
      }
    }
  }

  return chunk
}

async function benchmark () {
  for (let i = 0; i < 100; i++) {
    let worldDir = path.join(os.tmpdir(), 'tmp-world-' + Math.round(Math.random() * 100000))
    mkdirp.sync(worldDir)

    let w = new World(generateRandomChunk, worldDir)
    let col = await w.getColumn(0, 0)
    await w.setColumn(0, 0, col, true)
    await w.waitSaving()
    await w.stopSaving()
  }
}

module.exports = benchmark
