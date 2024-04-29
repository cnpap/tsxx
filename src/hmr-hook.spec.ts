import signale from 'signale'
import { expect, it } from 'vitest'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import { hookServices, unblocks } from './hmr-hook.cjs'

it('auto unblocks', async () => {
  hookServices()
  // eslint-disable-next-line ts/no-require-imports,ts/no-var-requires
  const http = require('node:http')
  const server = http.createServer((_: any, res: any) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World\n')
  })
  const port = 3007
  const count = await new Promise((resolve) => {
    server.listen(port, () => {
      signale.log(`Server running at http://localhost:${port}`)
      setInterval(async () => {
        resolve(await unblocks())
      }, 100)
    })
  })
  expect(count).toBe(1)
})
