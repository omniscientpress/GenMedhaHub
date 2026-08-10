import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { isPopulatedMedia, mediaUrl } from '@/lib/cms/media'
import type { LayoutBlock } from '@/lib/cms/types'
import { Button } from '@/components/ui/button'

import type { BlockRendererProps } from './registry'

type EmbedBlock = Extract<LayoutBlock, { blockType: 'embed' }>

export function EmbedBlockRenderer({ block }: BlockRendererProps<EmbedBlock>) {
  if (block.embedKind === 'video') {
    const poster = isPopulatedMedia(block.poster) ? mediaUrl(block.poster) : null
    return (
      <Section spacing="default">
        <Container>
          <video
            controls
            className="aspect-video w-full rounded-lg border bg-black"
            poster={poster ?? undefined}
            src={block.url}
          >
            <track kind="captions" />
          </video>
        </Container>
      </Section>
    )
  }

  if (block.embedKind === 'cal-inline') {
    return (
      <Section spacing="default">
        <Container>
          <iframe
            title="Book a call"
            src={block.url}
            className="min-h-[640px] w-full rounded-lg border"
            loading="lazy"
          />
        </Container>
      </Section>
    )
  }

  return (
    <Section spacing="default">
      <Container>
        <Stack gap="4" className="items-start">
          <p className="text-muted-foreground text-sm">Opens scheduling in a new context.</p>
          <Button variant="cta-primary" asChild>
            <Link href={block.url} target="_blank" rel="noopener noreferrer">
              Book a call
            </Link>
          </Button>
        </Stack>
      </Container>
    </Section>
  )
}
