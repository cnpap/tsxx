import { getHookHttpUrl, getHookNetUrl } from './util.cjs'

// noinspection JSUnusedGlobalSymbols
export async function resolve(specifier, context, defaultResolve) {
  if (context.conditions.includes('import')) {
    /**
     * @type {string}
     */
    let newSpecifier = specifier
    if (newSpecifier.startsWith('node:'))
      newSpecifier = newSpecifier.slice('node:'.length)

    if (newSpecifier === 'net')
      specifier = getHookNetUrl()
    else if (newSpecifier === 'http')
      specifier = getHookHttpUrl()
  }
  return defaultResolve(specifier, context, defaultResolve)
}
