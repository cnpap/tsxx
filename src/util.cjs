const url = require('node:url')
const path = require('node:path')

const loaders = [
  ['--require', './hmr-proxy.cjs'],
  ['--import', './loaders/loader-block.mjs'],
]
function getLoaderUrl(includeType, pathname) {
  if (includeType === '--require')
    return path.join(__dirname, pathname)
  else
    return url.pathToFileURL(require.resolve(pathname)).toString()
}

function getLoaderArgs() {
  const args = []
  for (const loader of loaders) {
    const [includeType, pathname] = loader
    args.push(includeType, getLoaderUrl(includeType, pathname))
  }
  return args
}

function getSpawnArgs(oldArgs) {
  const newArgs = [...oldArgs]
  newArgs.splice(0, 0, ...getLoaderArgs())
  return newArgs
}

class Debounce {
  constructor(func, delay) {
    this.func = func
    this.delay = delay
    this.timeout = null
  }

  // noinspection JSUnusedGlobalSymbols
  call(...args) {
    if (this.timeout)
      clearTimeout(this.timeout)

    this.timeout = setTimeout(() => {
      this.func(...args)
    }, this.delay)
  }
}

module.exports.Debounce = Debounce

module.exports.getSpawnArgs = getSpawnArgs

module.exports.getLoaderArgs = getLoaderArgs
