import Link from 'next/link'

import { getCtaConfig } from '@/lib/cms/fetch'
import { resolveCta } from '@/lib/cms/cta'
import type { CtaKey } from '@/lib/cms/types'
import { Button } from '@/components/ui/button'

interface CtaLinkProps {
  ctaKey: CtaKey
  size?: 'default' | 'sm' | 'lg'
}

export async function CtaLink({ ctaKey, size = 'lg' }: CtaLinkProps) {
  const ctaConfig = await getCtaConfig()
  const cta = resolveCta(ctaKey, ctaConfig)
  if (!cta) return null

  return (
    <Button variant={cta.variant} size={size} asChild>
      <Link href={cta.href}>{cta.label}</Link>
    </Button>
  )
}
