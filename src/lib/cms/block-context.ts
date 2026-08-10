import type { CaseStudy } from '@/payload-types'

/** Optional parent-document context passed into block renderers. */
export interface BlockRenderContext {
  relatedCaseStudies?: (number | CaseStudy)[] | null
}
