import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Grid } from '@/components/layout/grid'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { populatedDocs } from '@/lib/cms/relationships'
import type { CaseStudy } from '@/payload-types'
import type { LayoutBlock } from '@/lib/cms/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import type { BlockRendererProps } from './registry'

type CaseStudyCardListBlock = Extract<LayoutBlock, { blockType: 'caseStudyCardList' }>

function resolveCaseStudies(
  block: CaseStudyCardListBlock,
  context?: BlockRendererProps['context'],
): CaseStudy[] {
  if (block.source === 'related') {
    return populatedDocs(context?.relatedCaseStudies ?? [])
  }
  return populatedDocs(block.caseStudies ?? [])
}

export function CaseStudyCardListBlockRenderer({ block, context }: BlockRendererProps<CaseStudyCardListBlock>) {
  const caseStudies = resolveCaseStudies(block, context)
  if (!caseStudies.length) return null

  return (
    <Section spacing="default">
      <Container>
        <Stack gap="8">
          {block.heading ? <h2 className="text-3xl font-bold tracking-tight">{block.heading}</h2> : null}
          <Grid cols={3}>
            {caseStudies.map((study) => (
              <Card key={study.id}>
                <CardHeader>
                  <CardTitle className="text-lg leading-snug">{study.outcomeTitle}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {study.client} · {study.industry}
                  </p>
                </CardHeader>
                <CardContent>
                  {study.isPlaceholder ? (
                    <Badge variant="outline">Build in public</Badge>
                  ) : (
                    <p className="text-muted-foreground text-sm">Outcome-led case study</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/work/${study.slug}`}>Read case study</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  )
}
