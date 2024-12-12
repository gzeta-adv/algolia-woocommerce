/* eslint-disable @typescript-eslint/no-unused-expressions, @typescript-eslint/no-unsafe-argument */
import { debug, error, info, warn } from 'node:console'
import Env from './env.js'

/**
 * Application logger supporting GitHub Actions annotations.
 */
const log = {
  debug: (...data: any[]) => {
    Env.GITHUB_ACTIONS ? debug(`::debug::${data.join(' ')}`) : debug(...data)
  },
  error: (...data: any[]) => {
    Env.GITHUB_ACTIONS ? error(`::error::${data.join(' ')}`) : error(...data)
  },
  info,
  notice: (...data: any[]) => {
    Env.GITHUB_ACTIONS ? info(`::notice::${data.join(' ')}`) : info(...data)
  },
  warn: (...data: any[]) => {
    Env.GITHUB_ACTIONS ? warn(`::warning::${data.join(' ')}`) : warn(...data)
  },
}

export default log
