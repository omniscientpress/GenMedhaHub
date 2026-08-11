import type { Config } from '../../src/payload-types'

type CollectionSlug = keyof Config['collections']
type GlobalSlug = keyof Config['globals']

let seedUser: { id: string | number; roles?: ('admin' | 'editor')[] } | null = null

/** Admin user context so hooks (e.g. preventEditorPublish on pages) allow publish. */
export function setSeedUser(user: { id: string | number; roles?: ('admin' | 'editor')[] }) {
  seedUser = user
}

function createContext() {
  return seedUser ? { user: seedUser } : {}
}

/** Minimal Lexical rich-text document for seed placeholders. */
export function richText(text: string) {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text,
              version: 1,
            },
          ],
        },
      ],
    },
  }
}

/** Repeat text to satisfy minLength validators (e.g. markets marketContext 400 chars). */
export function padText(base: string, minLength: number): string {
  let out = base
  while (out.length < minLength) out += ` ${base}`
  return out.slice(0, minLength + base.length)
}

/** Multi-paragraph Lexical document (split on blank lines). */
export function richTextFromParagraphs(text: string) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean)
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: paragraphs.map((paragraph) => ({
        type: 'paragraph',
        format: '',
        indent: 0,
        version: 1,
        direction: 'ltr',
        children: [
          {
            type: 'text',
            detail: 0,
            format: 0,
            mode: 'normal',
            style: '',
            text: paragraph.replace(/\n/g, ' '),
            version: 1,
          },
        ],
      })),
    },
  }
}

export function heroBlock(
  headline: string,
  subhead?: string,
  eyebrow?: string,
  media?: string | number,
) {
  return {
    blockType: 'hero' as const,
    headline,
    subhead,
    eyebrow,
    media,
    variant: 'default' as const,
    ctaKey: 'book-call' as const,
  }
}

export function ctaBandBlock(heading: string, body?: string, ctaKey: 'book-call' | 'get-audit' | 'scope-app' | 'view-work' = 'book-call') {
  return {
    blockType: 'ctaBand' as const,
    heading,
    body,
    ctaKey,
  }
}

export function featureGridBlock(
  heading: string,
  items: { icon: string; title: string; body: string }[],
) {
  return {
    blockType: 'featureGrid' as const,
    heading,
    items: items.map((item) => ({ ...item, icon: item.icon as 'build' })),
  }
}

export function pillarCardsBlock(
  heading: string,
  cards: { icon: string; title: string; proofLine: string; link: string }[],
) {
  return {
    blockType: 'pillarCards' as const,
    heading,
    cards: cards.map((card) => ({ ...card, icon: card.icon as 'web-app' })),
  }
}

export function metricsCalloutRowBlock(
  metrics: { label: string; value: string; context: string }[],
) {
  return {
    blockType: 'metricsCalloutRow' as const,
    metrics,
  }
}

export function richTextSectionBlock(text: string, wide = false) {
  return {
    blockType: 'richTextSection' as const,
    content: text.includes('\n\n') ? richTextFromParagraphs(text) : richText(text),
    maxWidth: wide ? ('wide' as const) : ('prose' as const),
  }
}

export function comparisonTableBlock(
  heading: string,
  columns: string[],
  rows: { criterion: string; cells: string[] }[],
  footnote?: string,
) {
  return {
    blockType: 'comparisonTable' as const,
    heading,
    columns: columns.map((label) => ({ label })),
    rows: rows.map((row) => ({
      criterion: row.criterion,
      cells: row.cells.map((value) => ({ value })),
    })),
    footnote,
  }
}

export function faqAccordionBlock(
  heading: string,
  faqs: { question: string; answer: string }[],
) {
  const padded =
    faqs.length >= 2
      ? faqs
      : [
          ...faqs,
          {
            question: 'How do we start?',
            answer:
              'Book a discovery call — we respond within two business days with an honest fit assessment.',
          },
        ]
  return {
    blockType: 'faqAccordion' as const,
    heading,
    faqs: padded.map((faq) => ({ question: faq.question, answer: richText(faq.answer) })),
    emitSchema: true,
  }
}

export function trustStripBlock(
  source: 'clients' | 'partner-badges' | 'oss' = 'clients',
  heading?: string,
) {
  return {
    blockType: 'trustStrip' as const,
    source,
    heading,
  }
}

export function testimonialBlock(testimonialId: string | number, layout: 'quote' | 'card' = 'quote') {
  return {
    blockType: 'testimonial' as const,
    testimonial: testimonialId,
    layout,
  }
}

type UpsertOptions = { refresh?: boolean }

export async function upsertByWhere<T extends Record<string, unknown>>(
  payload: import('payload').Payload,
  collection: CollectionSlug,
  where: import('payload').Where,
  data: T,
  options?: UpsertOptions,
): Promise<{ id: string | number; created: boolean; updated: boolean }> {
  const existing = await payload.find({
    collection,
    where,
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    if (options?.refresh) {
      await payload.update({
        collection,
        id: existing.docs[0].id,
        data: { ...data, _status: 'published' },
        overrideAccess: true,
        ...createContext(),
      })
      return { id: existing.docs[0].id, created: false, updated: true }
    }
    return { id: existing.docs[0].id, created: false, updated: false }
  }
  const doc = await payload.create({
    collection,
    data: { ...data, _status: 'published' },
    draft: false,
    overrideAccess: true,
    ...createContext(),
  })
  return { id: doc.id, created: true, updated: false }
}

export async function upsertBySlug<T extends Record<string, unknown>>(
  payload: import('payload').Payload,
  collection: CollectionSlug,
  slug: string,
  data: T,
  options?: UpsertOptions,
): Promise<{ id: string | number; created: boolean; updated: boolean }> {
  const existing = await payload.find({
    collection,
    where: { slug: { equals: slug } },
    limit: 1,
    overrideAccess: true,
  })
  if (existing.docs[0]) {
    if (options?.refresh) {
      await payload.update({
        collection,
        id: existing.docs[0].id,
        data: { ...data, _status: 'published' },
        overrideAccess: true,
        ...createContext(),
      })
      return { id: existing.docs[0].id, created: false, updated: true }
    }
    return { id: existing.docs[0].id, created: false, updated: false }
  }
  const doc = await payload.create({
    collection,
    data: { ...data, slug, _status: 'published' },
    draft: false,
    overrideAccess: true,
    ...createContext(),
  })
  return { id: doc.id, created: true, updated: false }
}

export async function upsertGlobal(
  payload: import('payload').Payload,
  slug: GlobalSlug,
  data: Record<string, unknown>,
) {
  await payload.updateGlobal({ slug, data })
}
