import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { Button } from '@/components/ui/button'
import { SiteShell } from '@/components/shell/site-shell'

const USEFUL_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/platforms', label: 'Platforms' },
  { href: '/migrate', label: 'Migrate' },
  { href: '/solutions', label: 'Solutions' },
  { href: '/work', label: 'Work' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
  { href: '/book', label: 'Book a discovery call' },
]

export default async function NotFound() {
  return (
    <SiteShell>
      <Section spacing="lg" className="border-b bg-muted/20">
        <Container>
          <Stack gap="6" className="max-w-2xl">
            <p className="text-primary text-sm font-semibold tracking-wide uppercase">404</p>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">This page is not on the map.</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              The URL may have moved, or it never existed. Use the links below — or book a discovery
              call and we will point you to the right playbook.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="/">Back to homepage</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/book">Book a discovery call</Link>
              </Button>
            </div>
          </Stack>
        </Container>
      </Section>
      <Section spacing="default">
        <Container>
          <h2 className="mb-6 text-xl font-semibold">Useful starting points</h2>
          <ul className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            {USEFUL_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:border-primary block rounded-lg border bg-card p-4 text-sm font-medium underline-offset-2 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </SiteShell>
  )
}
