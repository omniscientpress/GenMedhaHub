import { Container } from '@/components/layout/container'
import { Grid } from '@/components/layout/grid'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { CtaLink } from '@/components/cms/cta-link'
import type { LayoutBlock } from '@/lib/cms/types'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import type { BlockRendererProps } from './registry'

type PricingTableBlock = Extract<LayoutBlock, { blockType: 'pricingTable' }>

export function PricingTableBlockRenderer({ block }: BlockRendererProps<PricingTableBlock>) {
  return (
    <Section spacing="default">
      <Container>
        <Stack gap="8">
          {block.heading ? <h2 className="text-3xl font-bold tracking-tight">{block.heading}</h2> : null}
          <Grid cols={Math.min(block.tiers.length, 4) as 1 | 2 | 3 | 4}>
            {block.tiers.map((tier) => (
              <Card key={tier.id ?? tier.name} className="flex h-full flex-col">
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <p className="text-2xl font-bold">{tier.priceFrom}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {(tier.features ?? []).map((feature) =>
                      feature.feature ? (
                        <li key={feature.id ?? feature.feature} className="text-muted-foreground text-sm">
                          {feature.feature}
                        </li>
                      ) : null,
                    )}
                  </ul>
                </CardContent>
                <CardFooter>
                  <CtaLink ctaKey={tier.ctaKey} size="default" />
                </CardFooter>
              </Card>
            ))}
          </Grid>
          {block.footnote ? (
            <p className="text-muted-foreground text-sm leading-relaxed">{block.footnote}</p>
          ) : null}
        </Stack>
      </Container>
    </Section>
  )
}
