import { searchClient, type SearchClient } from '@algolia/client-search'
import Env from '../../lib/env.js'

/**
 * Algolia client instance.
 */
const algolia: SearchClient = searchClient(Env.ALGOLIA_APPLICATION_ID, Env.ALGOLIA_PRIVATE_KEY)

export default algolia
