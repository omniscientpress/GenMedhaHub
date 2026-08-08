import * as React from 'react'

import { cn } from '@/lib/utils'

type SectionProps = React.ComponentProps<'section'> & {
  spacing?: 'default' | 'sm' | 'lg' | 'none'
}

const spacingClasses = {
  none: '',
  sm: 'py-8',
  default: 'py-16',
  lg: 'py-24',
} as const

function Section({ className, spacing = 'default', ...props }: SectionProps) {
  return (
    <section
      data-slot="section"
      className={cn(spacingClasses[spacing], className)}
      {...props}
    />
  )
}

export { Section }
