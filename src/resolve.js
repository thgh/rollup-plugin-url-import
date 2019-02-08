// Resolvers

export function resolveModule(specifier, referrer) {
  if (isUrl(specifier)) {
    return specifier
  }

  if (isAbsolute(specifier)) {
    if (isUrl(referrer)) {
      return origin(referrer) + specifier
    }
    return specifier
  }

  return resolveUrl(referrer, specifier)
}

export function resolveUrl(baseUrl, path) {
  const parts = baseUrl.split('/').slice(0, -1)
  const originLength = isUrl(baseUrl) ? 3 : 1

  path.split('/').forEach(part => {
    if (part === '.' || !part) {
      return
    }
    if (part === '..') {
      return parts.length > originLength && parts.pop()
    }
    parts.push(part)
  })

  return parts.join('/')
}

// Path / URL checks

export function isAbsolute(path) {
  return path.startsWith('/')
}

export function isRelative(path) {
  return !isAbsolute(path) && !isUrl(path)
}

export function isUrl(url) {
  return /^[a-zA-Z0-9+-.]+:\/\//.test(url)
}

// URL helper

export function origin(url) {
  return url
    .split('/')
    .slice(0, 3)
    .join('/')
}
