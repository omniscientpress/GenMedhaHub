import type { Metadata } from 'next'
import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { LayoutPage } from '@/components/cms/layout-page'
import { SiteShell } from '@/components/shell/site-shell'
import { Button } from '@/components/ui/button'
import { getPageByRoutePath } from '@/lib/cms/fetch'
import { metadataForLayoutDocument } from '@/lib/cms/layout-route'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageByRoutePath('/')
  if (page && page._status === 'published') {
    return metadataForLayoutDocument({
      document: page,
      path: '/',
      getTitle: (doc) => doc.title,
      getDescription: () => 'GenMedha Hub — digital agency for commerce and product engineering.',
      getSeo: (doc) => doc.seo,
    })
  }

  return {
    title: 'GenMedha Hub',
    description: 'Platform baseline is up. Design system tokens, primitives, and global shell are live.',
  }
}

export default async function HomePage() {
  const page = await getPageByRoutePath('/')

  if (page && page._status === 'published') {
    return <LayoutPage layout={page.layout} breadcrumbs={[{ label: 'Home', href: '/' }]} />
  }

  return (
    <SiteShell>
      <Section spacing="lg">
        <Container>
          <Stack gap="6" className="items-start">
            <h1 className="text-4xl font-bold tracking-tight">GenMedha Hub</h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              CMS homepage not seeded yet. Publish a Page with routePath &quot;/&quot; in admin, or run the seed
              script after Phase 3.
            </p>
            <Button variant="cta-primary" asChild>
              <Link href="/dev/catalog">View design catalog</Link>
            </Button>
          </Stack>
        </Container>
      </Section>
    </SiteShell>
  )
}
