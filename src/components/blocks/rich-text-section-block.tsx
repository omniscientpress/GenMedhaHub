import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { CmsRichText } from '@/components/cms/cms-rich-text'
import type { RichTextSectionBlock } from '@/lib/cms/types'
import { cn } from '@/lib/utils'

import type { BlockRendererProps } from './registry'

const widthClasses = {
  prose: 'max-w-3xl',
  wide: 'max-w-5xl',
} as const

export function RichTextSectionBlockRenderer({ block }: BlockRendererProps<RichTextSectionBlock>) {
  const maxWidth = block.maxWidth ?? 'prose'

  return (
    <Section spacing="default">
      <Container>
        <div className={cn('mx-auto', widthClasses[maxWidth])}>
          <CmsRichText content={block.content} />
        </div>
      </Container>
    </Section>
  )
}
