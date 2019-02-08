import { resolveModule } from '../src/resolve.js'
import { basics, bruteforce } from './resolve.samples.js'
// import padEnd from 'https://unpkg.com/lodash-es@4.17.11/padEnd'
// import shuffle from 'https://unpkg.com/lodash-es@4.17.11/shuffle'

console.log('basics', basics.filter(execute).length)
console.log('bruteforce', bruteforce.filter(execute).length)

function execute([specifier, referrer, expected], i) {
  const res = resolveModule(specifier, referrer)
  if (res !== expected) {
    console.log('\nTest', i)
    console.log(' referrer  ', referrer)
    console.log('specifier  ', specifier)
    console.log('   actual  ', res)
    console.log(' expected  ', expected)
    return true
  }
}

// generateBruteforce()

function generateBruteforce() {
  const specifiers = garbageSpecifiers()
  console.log('specifiers', specifiers.length)

  const referrers = garbageReferrers()
  console.log('referrers', referrers.length)

  const results = []
  specifiers.filter(s =>
    referrers.filter(r => {
      // results.push(
      //   padEnd(resolveModule(s, r), 25) +
      //     padEnd(s, 25) +
      //     padEnd(r, 12)
      // )
      results.push(s + "','" + r + "','" + resolveModule(s, r))
    })
  )

  // shuffle(results).forEach(a => console.log(a))
  console.log("['" + results.join("'],\n['") + "']")
}

// Helpers

function garbageSpecifiers(url) {
  const urls = []
  ;['', './', '../', '../../', '../../../../../'].forEach(a => {
    ;['a', 'b/a', 'e/d/c/b/a', '.d', '.g/.h/.f', ''].forEach(b => {
      urls.push(a + b + '.js')
    })
  })
  return urls
}
function garbageReferrers(url) {
  const urls = []
  ;['http://h', ''].forEach(a => {
    ;['a', 'c/b/a', '.d'].forEach(b => {
      ;['.js', '/'].forEach(e => {
        urls.push(a + '/' + b + e)
      })
    })
  })
  return urls
}
