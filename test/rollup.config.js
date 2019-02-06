import assert from 'assert'
import urlImport from '../dist/index.esm.js'

const eval2 = eval
const tests = {
  'left-pad.js': '   3spaces',
  'thumbs.js': '👍'
}

export default Object.entries(tests).map(([file, expected]) => ({
  input: 'input/' + file,
  output: {
    file: 'output/' + file,
    format: 'esm'
  },
  plugins: [
    urlImport({ verbose: true, jspm: true }),
    {
      writeBundle(bundle) {
        const { log } = console
        console.log = function (actual) {
          assert.equal(actual, expected)
        }
        const output = eval2(bundle[file].code)
        console.log = log
      }
    }
  ]
}))
