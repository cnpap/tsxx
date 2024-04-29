/* eslint-disable unused-imports/no-unused-vars */
const net = require('node:net')
const process = require('node:process')
// noinspection JSUnusedLocalSymbols
const http = require('node:http')

/**
 * @type {http.Server[]}
 */
const services = []

function hookNetServer() {
  const oldCreateServer = net.createServer
  net.createServer = (...args) => {
    const server = oldCreateServer.call(this, ...args)
    services.push(server)
    return server
  }
}

function hookHttpServer() {
  const http = require('node:http')
  const oldCreateServer = http.createServer
  http.createServer = (...args) => {
    const service = oldCreateServer.call(this, ...args)
    services.push(service)
    return service
  }
}

async function closeServices() {
  let count = 0
  process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error)
  })
  for (const index in services) {
    const service = services[index]
    await new Promise((resolve, reject) => {
      try {
        // noinspection JSUnresolvedReference
        service.closeAllConnections()
        // noinspection JSUnresolvedReference
        service.closeIdleConnections()
        // noinspection JSUnresolvedReference
        service.close((err) => {
          if (err) {
            reject(err)
            return
          }
          count++
          resolve()
        })
      }
      catch (e) {
        console.error(e)
      }
      resolve()
    }).catch((e) => {
      console.error(e)
    })
  }
  services.splice(0, services.length)
  return count
}

function hookServices() {
  hookNetServer()
  hookHttpServer()
}

async function unblocks() {
  return await closeServices()
}

module.exports.hookServices = hookServices

module.exports.unblocks = unblocks
