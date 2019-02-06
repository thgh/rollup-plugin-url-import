function isAbsolute(pathname) {
  return pathname.charAt(0) === '/'
}

// About 1.5x faster than the two-arg version of Array#splice()
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1) {
    list[i] = list[k]
  }

  list.pop()
}

// This implementation is based heavily on node's url.parse
export function resolve(from, to) {
  if (isUrl(from) && to.startsWith('/')) {
    console.log('split1')
    return (
      from
        .split('/')
        .slice(0, 3)
        .join('/') + to
    )
  }

  if (from === undefined) from = ''
  if (to === undefined) to = ''

  console.log('split2')
  var toParts = (to && to.split('/')) || []
  console.log('split3')
  var fromParts = (from && from.split('/')) || []

  var isToAbs = to && isAbsolute(to)
  var isFromAbs = from && isAbsolute(from)
  var mustEndAbs = isToAbs || isFromAbs

  if (to && isAbsolute(to)) {
    // to is absolute
    fromParts = toParts
  } else if (toParts.length) {
    // to is relative, drop the filename
    fromParts.pop()
    fromParts = fromParts.concat(toParts)
  }

  if (!fromParts.length) return '/'

  var hasTrailingSlash
  if (fromParts.length) {
    var last = fromParts[fromParts.length - 1]
    hasTrailingSlash = last === '.' || last === '..' || last === ''
  } else {
    hasTrailingSlash = false
  }

  var up = 0
  for (var i = fromParts.length; i >= 0; i--) {
    var part = fromParts[i]

    if (part === '.') {
      spliceOne(fromParts, i)
    } else if (part === '..') {
      spliceOne(fromParts, i)
      up++
    } else if (up) {
      spliceOne(fromParts, i)
      up--
    }
  }

  if (!mustEndAbs) for (; up--; up) fromParts.unshift('..')

  if (
    mustEndAbs &&
    fromParts[0] !== '' &&
    (!fromParts[0] || !isAbsolute(fromParts[0]))
  )
    fromParts.unshift('')

  var result = fromParts.join('/')

  if (hasTrailingSlash && result.substr(-1) !== '/') result += '/'

  return result
}

export function isUrl(str) {
  return str && (str.startsWith('http:') || str.startsWith('https:'))
}

export function isPath(str) {
  return str && (str.startsWith('.') || str.startsWith('/'))
}
