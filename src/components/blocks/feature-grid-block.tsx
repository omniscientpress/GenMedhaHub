import { Container } from '@/components/layout/container'
import { Grid } from '@/components/layout/grid'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import { ServiceIcon } from '@/components/cms/service-icon'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { LayoutBlock } from '@/lib/cms/types'

import type { BlockRendererProps } from './registry'

type FeatureGridBlock = Extract<LayoutBlock, { blockType: 'featureGrid' }>

export function FeatureGridBlockRenderer({ block }: BlockRendererProps<FeatureGridBlock>) {
  return (
    <Section spacing="default">
      <Container>
        <Stack gap="8">
          {block.heading ? <h2 className="text-3xl font-bold tracking-tight">{block.heading}</h2> : null}
          <Grid cols={3}>
            {block.items.map((item) => (
              <Card key={item.id ?? item.title}>
                <CardHeader>
                  <div className="mb-2">
                    <ServiceIcon icon={item.icon} />
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.body}</p>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Stack>
      </Container>
    </Section>
  )
}
