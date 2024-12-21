import * as wordPressRequests from './requests.js'

/**
 * WordPress client instance.
 */
const wordPress = {
  ...wordPressRequests,
}

export default wordPress
export * from './enums.js'
export * from './types.js'
