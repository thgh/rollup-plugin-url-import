import assert from 'assert'
import urlImport from '../dist/index.esm.js'

const eval2 = eval
const tests = {
  'left-pad.js': '   3spaces',
  'thumbs.js': '👍',
  'rollup.js': null
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
        if (file === 'rollup.js') {
          // const AsyncFunction = Object.getPrototypeOf(async function() {})
          //   .constructor
          // const output = eval2(bundle[file].code)

          // const func = new AsyncFunction('rollupInput', bundle[file].code)

          // func('input/thumbs.js').then(v => {
          //   console.log('then', v)
          // })
        } else {
          let actual
          const { log } = console
          console.log = function(a) {
            actual = a
          }
          const output = eval2(bundle[file].code)
          assert.equal(actual, expected)
          console.log = log
        }
      }
    }
  ]
}))
