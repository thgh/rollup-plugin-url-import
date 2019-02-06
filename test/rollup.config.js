import assert from 'assert'
import urlImport from '../dist/index.esm.js'

const eval2 = eval
const tests = {
  'left-pad.js': '   3spaces'
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
        const output = eval2(bundle[file].code)
        assert.ok(output, expected)
      }
    }
  ]
}))
