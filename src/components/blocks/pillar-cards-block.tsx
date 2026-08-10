import Link from 'next/link'

import { Container } from '@/components/layout/container'
import { Grid } from '@/components/layout/grid'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { ServiceIcon } from '@/components/cms/service-icon'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import type { LayoutBlock } from '@/lib/cms/types'

import type { BlockRendererProps } from './registry'

type PillarCardsBlock = Extract<LayoutBlock, { blockType: 'pillarCards' }>

export function PillarCardsBlockRenderer({ block }: BlockRendererProps<PillarCardsBlock>) {
  return (
    <Section spacing="default" className="border-y bg-muted/20">
      <Container>
        <Stack gap="8">
          {block.heading ? <h2 className="text-3xl font-bold tracking-tight">{block.heading}</h2> : null}
          <Grid cols={2}>
            {block.cards.map((card) => (
              <Card key={card.id ?? card.title} className="h-full">
                <CardHeader>
                  <div className="mb-2">
                    <ServiceIcon icon={card.icon} />
                  </div>
                  <CardTitle>{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.proofLine}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" asChild>
                    <Link href={card.link}>Learn more</Link>
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
