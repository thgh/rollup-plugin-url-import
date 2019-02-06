import { resolve, isUrl, isPath } from './url.js'

export default function urlImport(options = {}) {
  const cache = new Map()

  return {
    name: 'urlImport',
    resolveId(importee, importer) {
      if (isUrl(importee)) {
        return importee
      } else if (isUrl(importer)) {
        if (isPath(importee)) {
          return resolve(importer, importee)
        } else if (options.jspm) {
          return 'https://dev.jspm.io/' + importee
        }
      }
      return null
    },
    load(id) {
      if (isUrl(id)) {
        if (cache.has(id)) {
          return cache.get(id)
        }

        if (options.verbose) {
          console.log('fetch', id)
        }

        // TODO: cache
        const code = fetchText(id)
        cache.set(id, code)
        return code
      }
      return null
    }
  }
}

function fetchText(url) {
  // Deno / browser
  if (typeof fetch === 'function') {
    return fetch(url).then(r => r.text())
  }

  // Node
  return new Promise((resolve, reject) => {
    const http = url.startsWith('https') ? require('https') : require('http')
    const request = http.get(url, response => {
      if (response.statusCode < 200 || response.statusCode > 299) {
        reject(new Error('Error statusCode ' + response.statusCode))
      }
      const body = []
      response.setEncoding('utf8')
      response.on('data', chunk => body.push(chunk))
      response.on('end', () => resolve(body.join('')))
    })
    request.on('error', err => reject(err))
  })
}
