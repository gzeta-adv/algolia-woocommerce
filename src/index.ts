import 'dotenv/config'
import { error } from 'node:console'
import actions from './actions/index.js'
import { info } from './lib/logger.js'
import { camelToKebab, exit, kebabToCamel } from './lib/utils.js'

const [input, ...opts] = process.argv.slice(2)
if (!input) exit('Error: no action provided')
if (opts.length) exit('Error: unexpected options provided')

void (async () => {
  const actionKey = kebabToCamel(input) as keyof typeof actions
  const action = actions[actionKey]
  if (!action) {
    error(`Error: action "${input}" not found`)
    info(`\nAvailable actions:`)
    for (const action in actions) {
      info(`・${camelToKebab(action)}`)
    }
    info('')
    exit()
  }

  await action()
})()
