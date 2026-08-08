import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { SiteShell } from '@/components/shell/site-shell'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <SiteShell>
      <Section spacing="lg">
        <Container>
          <Stack gap="6" className="items-start">
            <h1 className="text-4xl font-bold tracking-tight">GenMedha Hub</h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Platform baseline is up. Design system tokens, primitives, and global shell are live.
              Full site pages come in the next phase.
            </p>
            <Button variant="cta-primary" asChild>
              <a href="/dev/catalog">View design catalog</a>
            </Button>
          </Stack>
        </Container>
      </Section>
    </SiteShell>
  )
}
