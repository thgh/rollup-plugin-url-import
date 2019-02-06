# Rollup plugin that resolves URL imports

<a href="LICENSE">
  <img src="https://img.shields.io/badge/license-MIT-brightgreen.svg" alt="Software License" />
</a>
<a href="https://github.com/thgh/rollup-plugin-url-import/issues">
  <img src="https://img.shields.io/github/issues/thgh/rollup-plugin-url-import.svg" alt="Issues" />
</a>
<a href="https://github.com/thgh/rollup-plugin-url-import/releases">
  <img src="https://img.shields.io/github/release/thgh/rollup-plugin-url-import.svg" alt="Latest Version" />
</a>
  
## Installation
```
npm install --save-dev rollup-plugin-url-import
```

## Usage
```js
// rollup.config.js
import urlImport from 'rollup-plugin-url-import'

export default {
  input: 'input.js',
  output: { file: 'output.js', format: 'esm' },
  plugins: [
    urlImport()
  ]
}
```

```js
// input.js
import leftPad from 'https://dev.jspm.io/left-pad'

console.log(leftPad('test', 8))
```

### Options

The cache option is not yet implemented.

```js
urlImport({
  // Cache fetched modules (default: false)
  cache: true,

  // Cache fetched modules in specified folder
  cache: '~/.deno/deps',

  // Enable output of fetched urls (default: false)
  verbose: true,

  // Fetch named modules from jspm.io (default: false)
  jspm: true
})
```

## Changelog

Please see [CHANGELOG](CHANGELOG.md) for more information what has changed recently.

## Contributing

Contributions and feedback are very welcome.

To get it running:
  1. Clone the project.
  2. `npm install`
  3. `npm run build`
  4. `npm run test`

## Credits

- [Thomas Ghysels](https://github.com/thgh)
- [All Contributors][link-contributors]

## License

The MIT License (MIT). Please see [License File](LICENSE) for more information.

[link-author]: https://github.com/thgh
[link-contributors]: ../../contributors
[rollup-plugin-url-import]: https://www.npmjs.com/package/rollup-plugin-url-import
