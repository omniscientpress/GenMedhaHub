import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { CtaLink } from '@/components/cms/cta-link'
import type { LayoutBlock } from '@/lib/cms/types'

import type { BlockRendererProps } from './registry'

type CtaBandBlock = Extract<LayoutBlock, { blockType: 'ctaBand' }>

export function CtaBandBlockRenderer({ block }: BlockRendererProps<CtaBandBlock>) {
  return (
    <Section spacing="default" className="border-y bg-muted/30">
      <Container>
        <Stack gap="4" className="max-w-3xl items-start">
          <h2 className="text-3xl font-bold tracking-tight">{block.heading}</h2>
          {block.body ? <p className="text-muted-foreground text-lg leading-relaxed">{block.body}</p> : null}
          <div className="flex flex-wrap gap-3">
            <CtaLink ctaKey={block.ctaKey} />
            {block.secondaryCtaKey ? <CtaLink ctaKey={block.secondaryCtaKey} size="default" /> : null}
          </div>
        </Stack>
      </Container>
    </Section>
  )
}
