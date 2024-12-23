import console from 'node:console'
import Env from './env.js'

export const error = (...data: any[]) => {
  Env.GITHUB_ACTIONS ? console.error('::error::', ...data) : console.error(...data)
}
export const info = (...data: any[]) => {
  console.info(...data)
}
export const notice = (...data: any[]) => {
  Env.GITHUB_ACTIONS ? console.info('::notice::', ...data) : console.info(...data)
}
export const warn = (...data: any[]) => {
  Env.GITHUB_ACTIONS ? console.warn('::warning::', ...data) : console.warn(...data)
}

/**
 * Logger supporting GitHub Actions annotations.
 */
export const Logger = {
  error,
  info,
  notice,
  warn,
}

export default Logger
