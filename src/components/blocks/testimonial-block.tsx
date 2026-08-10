import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { isPopulatedMedia, mediaUrl } from '@/lib/cms/media'
import { isPopulated } from '@/lib/cms/relationships'
import type { LayoutBlock } from '@/lib/cms/types'
import { cn } from '@/lib/utils'

import type { BlockRendererProps } from './registry'

type TestimonialBlock = Extract<LayoutBlock, { blockType: 'testimonial' }>

export function TestimonialBlockRenderer({ block }: BlockRendererProps<TestimonialBlock>) {
  const testimonial = isPopulated(block.testimonial) ? block.testimonial : null
  if (!testimonial) return null

  const headshot = isPopulatedMedia(testimonial.headshot) ? mediaUrl(testimonial.headshot) : null
  const layout = block.layout ?? 'quote'

  return (
    <Section spacing="default">
      <Container>
        <figure
          className={cn(
            layout === 'card' ? 'rounded-lg border bg-card p-8 shadow-sm' : 'max-w-3xl border-l-4 border-primary pl-6',
          )}
        >
          <blockquote className="text-foreground text-xl leading-relaxed italic">
            &ldquo;{testimonial.quote}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3 not-italic">
            {headshot ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={headshot} alt="" className="size-12 rounded-full object-cover" />
            ) : null}
            <div>
              <p className="font-semibold">{testimonial.authorName}</p>
              <p className="text-muted-foreground text-sm">
                {testimonial.authorRole}, {testimonial.company}
              </p>
            </div>
          </figcaption>
        </figure>
      </Container>
    </Section>
  )
}
