import { resolveModule, isUrl } from './resolve.js'

const cache = new Map()

export default function urlImport(options = {}) {
  return {
    name: 'urlImport',
    resolveId(specifier, referrer) {
      if (isUrl(specifier) || isUrl(referrer)) {
        return resolveModule(specifier, referrer)
      }
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

function fetchText(url, redirects = 0) {
  // Deno / browser
  if (typeof fetch === 'function') {
    return fetch(url).then(r => r.text())
  }

  // Node
  return new Promise((resolve, reject) => {
    const http = url.startsWith('https') ? require('https') : require('http')
    const request = http.get(url, response => {
      if ((response.statusCode < 200 || response.statusCode > 299)) {
        const location = response.headers && response.headers.location

        if (location) {
          if (redirects > 3) {
            reject(new Error('Too many redirects ' + url));
          }

          const redirection = location.startsWith('http')
                ? location
                : require('url').resolve(url, location)

          return fetchText(redirection, redirects + 1).then(resolve, reject);
        } else {
          reject(new Error('Error statusCode ' + response.statusCode));
        }
      }
      const body = []
      response.setEncoding('utf8')
      response.on('data', chunk => body.push(chunk))
      response.on('end', () => resolve(body.join('')))
    })
    request.on('error', err => reject(err))
  })
}
