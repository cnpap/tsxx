const url = require('node:url')

function getHookNetUrl() {
  return url.pathToFileURL(require.resolve('./hook-net.cjs')).toString()
}

function getHookHttpUrl() {
  return url.pathToFileURL(require.resolve('./hook-http.cjs')).toString()
}

module.exports.getHookNetUrl = getHookNetUrl

module.exports.getHookHttpUrl = getHookHttpUrl
