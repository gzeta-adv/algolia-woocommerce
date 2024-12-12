import 'dotenv/config'
import actions from './actions/index.js'
import { exit, kebabToCamel } from './lib/utils.js'

const [input, ...opts] = process.argv.slice(2)
if (!input) exit('Error: no action provided')
if (opts.length) exit('Error: unexpected options provided')

void (async () => {
  try {
    const actionKey = kebabToCamel(input) as keyof typeof actions
    const action = actions[actionKey]
    await action()
  } catch {
    exit(`Error: action ${input} not found.`)
  }
})()
