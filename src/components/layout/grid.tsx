import * as React from 'react'

import { cn } from '@/lib/utils'

type GridProps = React.ComponentProps<'div'> & {
  cols?: 1 | 2 | 3 | 4 | 6
  gap?: '4' | '6' | '8'
}

const colClasses = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
} as const

const gapClasses = {
  '4': 'gap-4',
  '6': 'gap-6',
  '8': 'gap-8',
} as const

function Grid({ className, cols = 3, gap = '6', ...props }: GridProps) {
  return (
    <div
      data-slot="grid"
      className={cn('grid', colClasses[cols], gapClasses[gap], className)}
      {...props}
    />
  )
}

export { Grid }
