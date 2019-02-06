import { rollup } from 'https://dev.jspm.io/npm:rollup@1.1.2/dist/rollup.browser.es.js'
import urlImport from '../../dist/index.esm.js'

rollupInput = 'input/thumbs.js'

rollup({
  input: rollupInput,
  plugins: [urlImport()]
}).then(async bundle => {
  const gen = bundle.generate()
  console.log('built', gen.output[0].code)
})
console.log('bundling')
