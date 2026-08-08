import type { Block } from 'payload'

import { SERVICE_ICON_OPTIONS } from '../constants'
import { ctaKeyField } from '../fields/ctaKeyField'

const iconSelect = {
  name: 'icon',
  type: 'select' as const,
  required: true,
  options: [...SERVICE_ICON_OPTIONS],
}

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    { name: 'eyebrow', type: 'text' },
    { name: 'headline', type: 'text', required: true },
    { name: 'subhead', type: 'textarea' },
    ctaKeyField('ctaKey'),
    { name: 'media', type: 'upload', relationTo: 'media' },
    {
      name: 'variant',
      type: 'select',
      defaultValue: 'default',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Platform', value: 'platform' },
        { label: 'Migration', value: 'migration' },
      ],
    },
  ],
}

export const RichTextSectionBlock: Block = {
  slug: 'richTextSection',
  labels: { singular: 'Rich Text Section', plural: 'Rich Text Sections' },
  fields: [
    { name: 'content', type: 'richText', required: true },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'prose',
      options: [
        { label: 'Prose', value: 'prose' },
        { label: 'Wide', value: 'wide' },
      ],
    },
  ],
}

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  labels: { singular: 'Feature Grid', plural: 'Feature Grids' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 6,
      fields: [
        iconSelect,
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
  ],
}

/** bp:4.3 / ad:D9 — homepage Build & Grow band; exactly 2 cards with per-card links. */
export const PillarCardsBlock: Block = {
  slug: 'pillarCards',
  labels: { singular: 'Pillar Cards', plural: 'Pillar Cards' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'cards',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 2,
      admin: { description: 'ad:D9 — exactly 2 Build & Grow pillar cards with proofLine + link.' },
      fields: [
        { name: 'title', type: 'text', required: true },
        {
          name: 'proofLine',
          type: 'textarea',
          required: true,
          maxLength: 120,
          admin: { description: 'Stack-coherence proof ≤120 chars (ad:D9/D1).' },
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          admin: { description: 'Relative path to pillar service page.' },
        },
        iconSelect,
      ],
    },
  ],
}

export const MetricsCalloutRowBlock: Block = {
  slug: 'metricsCalloutRow',
  labels: { singular: 'Metrics Callout Row', plural: 'Metrics Callout Rows' },
  fields: [
    {
      name: 'metrics',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 4,
      admin: { description: 'bp:4.13 — context line mandatory for every metric.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'value', type: 'text', required: true },
        { name: 'context', type: 'text', required: true },
      ],
    },
  ],
}

export const CaseStudyCardListBlock: Block = {
  slug: 'caseStudyCardList',
  labels: { singular: 'Case Study Card List', plural: 'Case Study Card Lists' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'source',
      type: 'select',
      defaultValue: 'manual',
      options: [
        { label: 'Manual', value: 'manual' },
        { label: 'Related', value: 'related' },
      ],
    },
    {
      name: 'caseStudies',
      type: 'relationship',
      relationTo: 'case-studies',
      hasMany: true,
      admin: { condition: (_, siblingData) => siblingData?.source === 'manual' },
    },
  ],
}

export const CtaBandBlock: Block = {
  slug: 'ctaBand',
  labels: { singular: 'CTA Band', plural: 'CTA Bands' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    ctaKeyField('ctaKey', true),
    ctaKeyField('secondaryCtaKey'),
  ],
}

export const FaqAccordionBlock: Block = {
  slug: 'faqAccordion',
  labels: { singular: 'FAQ Accordion', plural: 'FAQ Accordions' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'faqs',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 12,
      admin: { description: 'bp:4.9/4.11 — feeds FAQPage JSON-LD at render (P3).' },
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'richText', required: true },
      ],
    },
    {
      name: 'emitSchema',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Emit FAQPage structured data when true.' },
    },
  ],
}

export const TrustStripBlock: Block = {
  slug: 'trustStrip',
  labels: { singular: 'Trust Strip', plural: 'Trust Strips' },
  fields: [
    {
      name: 'source',
      type: 'select',
      required: true,
      options: [
        { label: 'Clients', value: 'clients' },
        { label: 'Partner Badges', value: 'partner-badges' },
        { label: 'Open Source', value: 'oss' },
      ],
    },
    { name: 'heading', type: 'text' },
  ],
}

export const PricingTableBlock: Block = {
  slug: 'pricingTable',
  labels: { singular: 'Pricing Table', plural: 'Pricing Tables' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'tiers',
      type: 'array',
      required: true,
      minRows: 2,
      maxRows: 4,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'priceFrom', type: 'text', required: true },
        { name: 'features', type: 'array', fields: [{ name: 'feature', type: 'text' }] },
        ctaKeyField('ctaKey', true),
      ],
    },
    { name: 'footnote', type: 'textarea', admin: { description: 'Citation / benchmark footnote slot.' } },
  ],
}

export const EmbedBlock: Block = {
  slug: 'embed',
  labels: { singular: 'Embed', plural: 'Embeds' },
  fields: [
    {
      name: 'embedKind',
      type: 'select',
      required: true,
      options: [
        { label: 'Cal.com Inline', value: 'cal-inline' },
        { label: 'Cal.com Popup', value: 'cal-popup' },
        { label: 'Video', value: 'video' },
      ],
    },
    { name: 'url', type: 'text', required: true },
    {
      name: 'eventTypeKey',
      type: 'select',
      options: [
        { label: 'Discovery 30', value: 'discovery-30' },
        { label: 'Audit Scoping', value: 'audit-scoping' },
      ],
      admin: { description: 'From cta-config.bookingEventTypes; cal kinds only.' },
    },
    {
      name: 'poster',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Video poster only.' },
    },
  ],
}

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  labels: { singular: 'Testimonial', plural: 'Testimonials' },
  fields: [
    {
      name: 'testimonial',
      type: 'relationship',
      relationTo: 'testimonials',
      required: true,
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'quote',
      options: [
        { label: 'Quote', value: 'quote' },
        { label: 'Card', value: 'card' },
      ],
    },
  ],
}

export const ComparisonTableBlock: Block = {
  slug: 'comparisonTable',
  labels: { singular: 'Comparison Table', plural: 'Comparison Tables' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'columns',
      type: 'array',
      minRows: 2,
      maxRows: 4,
      fields: [{ name: 'label', type: 'text', required: true }],
    },
    {
      name: 'rows',
      type: 'array',
      required: true,
      fields: [
        { name: 'criterion', type: 'text', required: true },
        {
          name: 'cells',
          type: 'array',
          required: true,
          fields: [{ name: 'value', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'footnote',
      type: 'textarea',
      admin: { description: 'Mandatory citation slot for quantitative claims (5.11).' },
    },
  ],
}

/** Closed block library — 13 blocks (ch. 5.11). */
export const layoutBlocks = [
  HeroBlock,
  RichTextSectionBlock,
  FeatureGridBlock,
  PillarCardsBlock,
  MetricsCalloutRowBlock,
  CaseStudyCardListBlock,
  CtaBandBlock,
  FaqAccordionBlock,
  TrustStripBlock,
  PricingTableBlock,
  EmbedBlock,
  TestimonialBlock,
  ComparisonTableBlock,
]

export function layoutField(minRows = 1): {
  name: string
  type: 'blocks'
  required: true
  minRows: number
  blocks: typeof layoutBlocks
} {
  return {
    name: 'layout',
    type: 'blocks',
    required: true,
    minRows,
    blocks: layoutBlocks,
  }
}
