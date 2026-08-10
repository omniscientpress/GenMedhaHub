import { Container } from '@/components/layout/container'
import { Section } from '@/components/layout/section'
import { Stack } from '@/components/layout/stack'
import type { LayoutBlock } from '@/lib/cms/types'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import type { BlockRendererProps } from './registry'

type ComparisonTableBlock = Extract<LayoutBlock, { blockType: 'comparisonTable' }>

export function ComparisonTableBlockRenderer({ block }: BlockRendererProps<ComparisonTableBlock>) {
  const columns = block.columns ?? []

  return (
    <Section spacing="default">
      <Container>
        <Stack gap="6">
          {block.heading ? <h2 className="text-3xl font-bold tracking-tight">{block.heading}</h2> : null}
          <Table>
            {block.footnote ? <TableCaption>{block.footnote}</TableCaption> : null}
            <TableHeader>
              <TableRow>
                <TableHead>Criterion</TableHead>
                {columns.map((column) => (
                  <TableHead key={column.id ?? column.label}>{column.label}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {block.rows.map((row) => (
                <TableRow key={row.id ?? row.criterion}>
                  <TableCell className="font-medium">{row.criterion}</TableCell>
                  {row.cells.map((cell, index) => (
                    <TableCell key={cell.id ?? `${row.criterion}-${index}`}>{cell.value}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Stack>
      </Container>
    </Section>
  )
}
