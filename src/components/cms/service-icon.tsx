import {
  ArrowRightLeftIcon,
  GlobeIcon,
  HammerIcon,
  LifeBuoyIcon,
  SmartphoneIcon,
  type LucideIcon,
} from 'lucide-react'

import type { LayoutBlock } from '@/lib/cms/types'
import { cn } from '@/lib/utils'

type ServiceIconKey = Extract<LayoutBlock, { blockType: 'featureGrid' }>['items'][number]['icon']

const iconMap: Record<ServiceIconKey, LucideIcon> = {
  build: HammerIcon,
  migrate: ArrowRightLeftIcon,
  support: LifeBuoyIcon,
  'web-app': GlobeIcon,
  'mobile-app': SmartphoneIcon,
}

interface ServiceIconProps {
  icon: ServiceIconKey
  className?: string
}

export function ServiceIcon({ icon, className }: ServiceIconProps) {
  const Icon = iconMap[icon]
  return <Icon aria-hidden className={cn('size-5 shrink-0 text-primary', className)} />
}
