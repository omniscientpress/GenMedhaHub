import type { Metadata } from 'next'

import { Container } from '@/components/layout/container'
import { Grid } from '@/components/layout/grid'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { CmsRichText } from '@/components/cms/cms-rich-text'
import { Breadcrumbs } from '@/components/shell/breadcrumbs'
import { SiteShell } from '@/components/shell/site-shell'
import { Badge } from '@/components/ui/badge'
import { getCaseStudyBySlug } from '@/lib/cms/fetch'
import { publishedOrNotFound } from '@/lib/cms/layout-route'
import { isPopulated } from '@/lib/cms/relationships'
import { buildPageMetadata } from '@/lib/cms/seo'

export const revalidate = 300

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params
  const study = await getCaseStudyBySlug(slug)
  if (!study) return { title: 'Case study not found' }

  return buildPageMetadata({
    title: study.seo?.metaTitle?.trim() || study.outcomeTitle,
    description: study.seo?.metaDescription?.trim() || `${study.client} — ${study.industry}`,
    ogImage: study.seo?.ogImage,
    noindex: study.seo?.noindex,
    path: `/work/${study.slug}`,
  })
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const study = publishedOrNotFound(await getCaseStudyBySlug(slug))
  const testimonial = isPopulated(study.testimonial) ? study.testimonial : null

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Work', href: '/work' },
    { label: study.outcomeTitle, href: `/work/${study.slug}` },
  ]

  return (
    <SiteShell breadcrumbs={<Breadcrumbs segments={breadcrumbs} />}>
      <Section spacing="lg" className="border-b">
        <Container>
          <Stack gap="4">
            {study.isPlaceholder ? <Badge variant="outline">Build in public</Badge> : null}
            <h1 className="text-4xl font-bold tracking-tight">{study.outcomeTitle}</h1>
            <p className="text-muted-foreground text-lg">
              {study.client} · {study.industry}
            </p>
          </Stack>
        </Container>
      </Section>

      <Section spacing="default">
        <Container>
          <Grid cols={2} className="gap-10">
            <Stack gap="8">
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Challenge</h2>
                <CmsRichText content={study.challenge} />
              </section>
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Approach</h2>
                <CmsRichText content={study.approach} />
              </section>
            </Stack>
            <Stack gap="8">
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Solution</h2>
                <CmsRichText content={study.solution} />
              </section>
              <section>
                <h2 className="mb-4 text-2xl font-semibold">Results</h2>
                <CmsRichText content={study.results} />
              </section>
            </Stack>
          </Grid>
        </Container>
      </Section>

      {study.metrics.length > 0 ? (
        <Section spacing="default" className="border-t bg-muted/20">
          <Container>
            <Grid cols={3}>
              {study.metrics.map((metric) => (
                <div key={metric.id ?? metric.label} className="rounded-lg border bg-card p-6">
                  <p className="text-muted-foreground text-sm">{metric.label}</p>
                  <p className="mt-2 text-2xl font-bold">{metric.value}</p>
                  <p className="text-muted-foreground mt-2 text-xs">{metric.context}</p>
                </div>
              ))}
            </Grid>
          </Container>
        </Section>
      ) : null}

      {testimonial ? (
        <Section spacing="default">
          <Container>
            <blockquote className="max-w-3xl border-l-4 border-primary pl-6 italic">
              &ldquo;{testimonial.quote}&rdquo;
              <footer className="mt-4 not-italic">
                — {testimonial.authorName}, {testimonial.company}
              </footer>
            </blockquote>
          </Container>
        </Section>
      ) : null}
    </SiteShell>
  )
}
