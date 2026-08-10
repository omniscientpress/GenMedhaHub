import { Container } from '@/components/layout/container'
import { Grid } from '@/components/layout/grid'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { CtaLink } from '@/components/cms/cta-link'
import { isPopulatedMedia, mediaUrl } from '@/lib/cms/media'
import type { HeroBlock } from '@/lib/cms/types'
import { cn } from '@/lib/utils'

import type { BlockRendererProps } from './registry'

const variantClasses = {
  default: 'bg-background',
  platform: 'border-b bg-muted/30',
  migration: 'border-b bg-accent/40',
} as const

export function HeroBlockRenderer({ block }: BlockRendererProps<HeroBlock>) {
  const variant = block.variant ?? 'default'
  const image = isPopulatedMedia(block.media) ? block.media : null
  const imageSrc = image ? mediaUrl(image) : null

  return (
    <Section spacing="lg" className={cn('border-b', variantClasses[variant])}>
      <Container>
        <Grid cols={imageSrc ? 2 : 1} className="items-center gap-10">
          <Stack gap="6" className="items-start">
            {block.eyebrow ? (
              <p className="text-primary text-sm font-semibold tracking-wide uppercase">{block.eyebrow}</p>
            ) : null}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{block.headline}</h1>
              {block.subhead ? (
                <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">{block.subhead}</p>
              ) : null}
            </div>
            {block.ctaKey ? <CtaLink ctaKey={block.ctaKey} /> : null}
          </Stack>
          {imageSrc ? (
            <figure className="overflow-hidden rounded-lg border bg-card shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element -- CMS media URLs vary by storage backend. */}
              <img
                src={imageSrc}
                alt={image?.alt ?? ''}
                width={image?.width ?? undefined}
                height={image?.height ?? undefined}
                className="h-auto w-full object-cover"
              />
              {image?.caption ? (
                <figcaption className="text-muted-foreground border-t px-4 py-2 text-sm">{image.caption}</figcaption>
              ) : null}
            </figure>
          ) : null}
        </Grid>
      </Container>
    </Section>
  )
}
