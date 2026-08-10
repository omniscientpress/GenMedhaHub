import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'

/** Cached Payload client for Server Components and route handlers. */
export const getPayloadClient = cache(async () => {
  return getPayload({ config })
})
