import { Container } from '@/components/layout/container'
import { Grid } from '@/components/layout/grid'
import { Section } from '@/components/layout/section'
import type { LayoutBlock } from '@/lib/cms/types'

import type { BlockRendererProps } from './registry'

type MetricsCalloutRowBlock = Extract<LayoutBlock, { blockType: 'metricsCalloutRow' }>

export function MetricsCalloutRowBlockRenderer({ block }: BlockRendererProps<MetricsCalloutRowBlock>) {
  return (
    <Section spacing="default">
      <Container>
        <Grid cols={Math.min(block.metrics.length, 4) as 1 | 2 | 3 | 4}>
          {block.metrics.map((metric) => (
            <div key={metric.id ?? metric.label} className="rounded-lg border bg-card p-6 shadow-sm">
              <p className="text-muted-foreground text-sm font-medium">{metric.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">{metric.value}</p>
              <p className="text-muted-foreground mt-2 text-xs leading-relaxed">{metric.context}</p>
            </div>
          ))}
        </Grid>
      </Container>
    </Section>
  )
}
