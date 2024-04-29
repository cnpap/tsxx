import { expect, it } from 'vitest'
// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
import { Debounce, getLoaderArgs, getSpawnArgs } from './util.cjs'

it('get new spawn args', () => {
  const loaderArgs = getLoaderArgs()
  const newArgs = getSpawnArgs(['---', 'xxx', '--import', 'someJsFile.js'])
  expect(newArgs).toEqual([...loaderArgs, '---', 'xxx', '--import', 'someJsFile.js'])
})

it('debounce', () => {
  const num = {
    count: 1,
  }
  const call = new Debounce(() => {
    num.count++
  }, 100)
  call.call()
  call.call()
  call.call()
  expect(num.count).toBe(1)
})
