import type { CtaKey } from '@/lib/cms/types'
import type { CtaConfig } from '@/payload-types'

export interface ResolvedCta {
  label: string
  href: string
  variant: 'cta-primary' | 'cta-scope' | 'cta-audit' | 'default'
}

const fallbackCtas: Record<CtaKey, ResolvedCta> = {
  'book-call': { label: 'Book a discovery call', href: '/book', variant: 'cta-primary' },
  'get-audit': { label: 'Get a Legacy Platform Audit', href: '/contact?offer=audit', variant: 'cta-audit' },
  'scope-app': { label: 'Scope my app', href: '/contact', variant: 'cta-scope' },
  'download-checklist': { label: 'Download the checklist', href: '/resources', variant: 'default' },
  subscribe: { label: 'Subscribe', href: '/insights', variant: 'default' },
  'view-work': { label: 'View our work', href: '/work', variant: 'default' },
  'read-migration-guide': { label: 'Read the migration guide', href: '/insights', variant: 'default' },
}

const variantByKey: Partial<Record<CtaKey, ResolvedCta['variant']>> = {
  'book-call': 'cta-primary',
  'get-audit': 'cta-audit',
  'scope-app': 'cta-scope',
}

export function resolveCta(key: CtaKey | null | undefined, config?: CtaConfig | null): ResolvedCta | null {
  if (!key) return null

  const fromConfig = config?.primaryCtas?.find((cta) => cta.key === key)
  if (fromConfig) {
    return {
      label: fromConfig.label,
      href: fromConfig.href,
      variant: variantByKey[key] ?? 'default',
    }
  }

  return fallbackCtas[key] ?? null
}
