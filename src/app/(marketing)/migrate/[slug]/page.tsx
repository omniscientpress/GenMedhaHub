import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { Grid } from '@/components/layout/grid'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { CmsRichText } from '@/components/cms/cms-rich-text'
import { CtaLink } from '@/components/cms/cta-link'
import { Breadcrumbs } from '@/components/shell/breadcrumbs'
import { SiteShell } from '@/components/shell/site-shell'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getMigrationPageBySlug, getPageByRoutePath } from '@/lib/cms/fetch'
import { isPublishedDocument } from '@/lib/cms/document'
import { publishedOrNotFound } from '@/lib/cms/layout-route'
import { LayoutPage } from '@/components/cms/layout-page'
import { isPopulated } from '@/lib/cms/relationships'
import { faqPageJsonLd, lexicalPlainText } from '@/lib/cms/schema'
import { buildPageMetadata } from '@/lib/cms/seo'

export const revalidate = 300

interface MigrationPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: MigrationPageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await getMigrationPageBySlug(slug)
  if (page) {
    return buildPageMetadata({
      title: page.seo?.metaTitle?.trim() || page.title,
      description: page.seo?.metaDescription?.trim() || page.hero.subhead,
      ogImage: page.seo?.ogImage,
      noindex: page.seo?.noindex,
      path: `/migrate/${page.slug}`,
    })
  }

  const cmsPage = await getPageByRoutePath(`/migrate/${slug}`)
  if (cmsPage) {
    return buildPageMetadata({
      title: cmsPage.seo?.metaTitle?.trim() || cmsPage.title,
      description: cmsPage.seo?.metaDescription?.trim() || cmsPage.title,
      ogImage: cmsPage.seo?.ogImage,
      noindex: cmsPage.seo?.noindex,
      path: `/migrate/${slug}`,
    })
  }

  return { title: 'Migration guide not found' }
}

export default async function MigrationGuidePage({ params }: MigrationPageProps) {
  const { slug } = await params
  const pair = await getMigrationPageBySlug(slug)

  if (!pair || pair._status !== 'published') {
    const cmsPage = await getPageByRoutePath(`/migrate/${slug}`)
    if (isPublishedDocument(cmsPage)) {
      return (
        <LayoutPage
          layout={cmsPage.layout}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Migrate', href: '/migrate' },
            { label: cmsPage.title, href: `/migrate/${slug}` },
          ]}
        />
      )
    }
  }

  const page = publishedOrNotFound(pair)
  const source = isPopulated(page.sourcePlatform) ? page.sourcePlatform.name : 'Source'
  const target = isPopulated(page.targetPlatform) ? page.targetPlatform.name : 'Target'

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Migrate', href: '/migrate' },
    { label: page.title, href: `/migrate/${page.slug}` },
  ]

  const faqSchema = faqPageJsonLd(
    page.faqs.map((faq) => ({
      question: faq.question,
      answer: lexicalPlainText(faq.answer),
    })),
  )

  return (
    <SiteShell breadcrumbs={<Breadcrumbs segments={breadcrumbs} />}>
      <Section spacing="lg" className="border-b bg-muted/20">
        <Container>
          <Stack gap="4" className="max-w-3xl">
            <p className="text-primary text-sm font-semibold tracking-wide uppercase">
              {source} → {target}
            </p>
            <h1 className="text-4xl font-bold tracking-tight">{page.hero.headline}</h1>
            <p className="text-muted-foreground text-lg leading-relaxed">{page.hero.subhead}</p>
            <CtaLink ctaKey="book-call" />
          </Stack>
        </Container>
      </Section>

      <Section spacing="default">
        <Container>
          <Grid cols={2} className="gap-10">
            <Stack gap="8">
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Cost of staying</h2>
                <CmsRichText content={page.costOfStaying} />
              </section>
              <section>
                <h2 className="mb-4 text-2xl font-semibold">When not to migrate</h2>
                <CmsRichText content={page.whenNotToMigrate} />
              </section>
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Rollback plan</h2>
                <CmsRichText content={page.rollbackPlan} />
              </section>
            </Stack>
            <Stack gap="8">
              <section className="rounded-lg border bg-card p-6">
                <h2 className="mb-2 text-xl font-semibold">Urgency anchor</h2>
                <p className="font-medium">{page.urgencyAnchor.label}</p>
                <p className="text-muted-foreground mt-1 text-sm">
                  {page.urgencyAnchor.date} · Source: {page.urgencyAnchor.source}
                </p>
              </section>
              <section>
                <h2 className="mb-4 text-2xl font-semibold">TCO comparison</h2>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>{source}</TableHead>
                      <TableHead>{target}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {page.tcoBlock.comparisonRows.map((row) => (
                      <TableRow key={row.id ?? row.item}>
                        <TableCell className="font-medium">{row.item}</TableCell>
                        <TableCell>{row.sourceCost}</TableCell>
                        <TableCell>{row.targetCost}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <p className="text-muted-foreground mt-3 text-sm">{page.tcoBlock.methodologyNote}</p>
              </section>
            </Stack>
          </Grid>
        </Container>
      </Section>

      <Section spacing="default" className="border-t">
        <Container>
          <Stack gap="6">
            <h2 className="text-2xl font-semibold">Cutover steps</h2>
            <ol className="space-y-4">
              {page.cutoverSteps.map((step, index) => (
                <li key={step.id ?? step.stepTitle} className="rounded-lg border p-4">
                  <p className="font-medium">
                    {index + 1}. {step.stepTitle}
                  </p>
                  <p className="text-muted-foreground mt-2 text-sm">{step.detail}</p>
                  <p className="text-muted-foreground mt-1 text-xs">Duration: {step.durationWeeks}</p>
                </li>
              ))}
            </ol>
          </Stack>
        </Container>
      </Section>

      <Section spacing="default">
        <Container>
          <Stack gap="6" className="max-w-3xl">
            <h2 className="text-2xl font-semibold">FAQs</h2>
            <Accordion type="single" collapsible>
              {page.faqs.map((faq, index) => (
                <AccordionItem key={faq.id ?? faq.question} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>
                    <CmsRichText content={faq.answer} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Stack>
        </Container>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      </Section>
    </SiteShell>
  )
}
