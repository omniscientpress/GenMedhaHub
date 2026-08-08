import * as React from 'react'

import { cn } from '@/lib/utils'

type ContainerProps = React.ComponentProps<'div'> & {
  as?: 'div' | 'section' | 'main' | 'article'
}

function Container({ as: Comp = 'div', className, ...props }: ContainerProps) {
  return (
    <Comp
      data-slot="container"
      className={cn('mx-auto w-full max-w-[var(--container-max)] px-4 sm:px-6 lg:px-8', className)}
      {...props}
    />
  )
}

export { Container }
