import * as React from 'react'

import { cn } from '@/lib/utils'

type StackProps = React.ComponentProps<'div'> & {
  gap?: '1' | '2' | '3' | '4' | '6' | '8'
}

const gapClasses = {
  '1': 'gap-1',
  '2': 'gap-2',
  '3': 'gap-3',
  '4': 'gap-4',
  '6': 'gap-6',
  '8': 'gap-8',
} as const

function Stack({ className, gap = '4', ...props }: StackProps) {
  return (
    <div
      data-slot="stack"
      className={cn('flex flex-col', gapClasses[gap], className)}
      {...props}
    />
  )
}

export { Stack }
