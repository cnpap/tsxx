#!/usr/bin/env node
const childProcess = require('node:child_process')

const oldSpawn = childProcess.spawn
// noinspection JSValidateTypes
childProcess.spawn = (command, args, options) => {
  /**
   * Separate `getSpawnArgs` into a dedicated JavaScript file for testing purposes, as the code in this file is not conducive to testing.
   */
  const newArgs = require('./util.cjs').getSpawnArgs(args)
  const result = oldSpawn.call(this, command, newArgs, options)
  /**
   * After launching `spawn` in the TSX, there is no need to hook again. To avoid any adverse effects, revert the `spawn`.
   */
  childProcess.spawn = oldSpawn
  return result
}

// noinspection NpmUsedModulesInstalled
import('tsx/cli')
