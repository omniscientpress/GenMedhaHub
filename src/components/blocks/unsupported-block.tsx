import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'

interface UnsupportedBlockProps {
  blockType: string
}

/** Dev-only placeholder for blocks not yet implemented in Phase 3. */
export function UnsupportedBlock({ blockType }: UnsupportedBlockProps) {
  return (
    <Section spacing="sm" className="border-y border-dashed border-amber-500/50 bg-amber-500/5">
      <Container>
        <p className="text-amber-800 text-sm">
          Block renderer not implemented: <code className="font-mono">{blockType}</code>
        </p>
      </Container>
    </Section>
  )
}
